// private route to retrieve a list of job postings or a single one by id
// route: .../api/postings

const defaultPosting = include('app/models/defaultPosting');
const mailService = include('app/mailService');
const Posting = include('app/orm/postingMapper');
const validateToken = include('app/routes/api/validateToken');

module.exports = function(app, path) {

    let now = new Date();
    let msPerDay = 24 * 60 * 60 * 1000;

    // calculate the time in ms until 4 am
    let msTo4Am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 4) - now;

    // if it's after 4 am, calculate the time to 4 am the next day
    if (msTo4Am < 0) msTo4Am = msPerDay - msTo4Am;

    // set timer to call expired post method at 4 am
    setTimeout(() => checkForExpiredPostings(), msTo4Am);

    let checkForExpiredPostings = () => {
        // reset the timer to 4 am the next day
        setTimeout(() => checkForExpiredPostings(), msPerDay);

        Posting.getAllForExpiredPostingsCheck()
            .then(postings => {
                postings.filter(posting => posting.expiry_date)
                    .forEach(posting => {
                        if (new Date(posting.expiry_date) - new Date() < 0) {
                            // if the expiry date of the posting is before the current date:
                            // update posting status
                            Posting.updatePosting(posting.id, posting.account_id, { status: 'deactivated', expiry_date: '' })
                                .then(() => console.log('posting', posting.id , 'updated to status: deactivated'));
                        } else if (new Date(posting.expiry_date) - new Date() < 7 * msPerDay) {
                            // if the expiry date is less than seven days away:
                            // send soon to expire mail
                            // TODO: how often do we want to send this mail?, each day?, only once?
                            mailService.sendExpiringPostMail(posting.recruiter_name, posting.recruiter_email, posting.id, posting.title);
                        }
                    })
            });
    };


    // create a job posting
    app.post(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            let posting = Object.assign(defaultPosting, { account_id: req.decodedToken.id }, req.body);

            Posting.createPosting(posting)
                .then(([id]) => res.status(201).json({ posting_id: id }))
                .catch((err) => res.status(400).json({ error: err }));
        }
    );

    // get a list of job postings
    // only id, company_id, recruiter_id, title, status, expiry_date, contract_type, entry_level, company_name, recruiter_name
    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            let filters = req.query;
            Posting.getByAccountIdWithSelect(req.decodedToken.id)
                .then((postings) => {
                    // iterate over query parameters, check, if they are valid parameters for filtering and than
                    // filter for them on the postings array
                    for (let key in filters) {
                        if (filters.hasOwnProperty(key) && defaultPosting.hasOwnProperty(key)) {
                            // with a request url of .../postings?company_id=1&company_id=2 the respective query
                            // parameter is an array of strings, which will not correctly compare to the int of
                            // the company_id in the postings object. Therefor we must parse them to int. As a
                            // query for one company_id corresponds to a query parameter of type string we need
                            // to check that also in the if clause.
                            // The same issue arises from querying for specific recruiter_ids
                            if ((key === 'company_id' && filters[key] instanceof Array) ||
                                key === 'recruiter_id' && filters[key] instanceof Array) {
                                filters[key] = filters[key].map(e => parseInt(e));
                            }
                            postings = postings.filter(posting => filters[key].includes(posting[key]));
                        }
                    }
                    res.status(200).json(postings);
                })
                .catch((err) => res.status(400).json({ error: err }));
        }
    );

    // get a job posting by id
    app.get(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Posting.getByIdAndAccountId(req.params.id, req.decodedToken.id)
                .then(([posting]) => {
                    if (!posting) {
                        res.status(404).json({ error: 'posting not found' })
                    } else {
                        res.status(200).json(posting);
                    }
                })
                .catch((err) => res.status(400).json({ error: err }));
        }
    );

    // update a job posting
    app.put(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Posting.updatePosting(req.params.id, req.decodedToken.id, req.body)
                .then((affectedRows) => {
                    if (affectedRows === 0) {
                        res.status(404).json({ error: 'posting not found' })
                    } else {
                        res.status(200).json({ message: 'posting updated' });
                    }
                })
                .catch((err) => res.status(400).json({ error: err }));
        }
    );

    // delete a posting
    app.delete(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Posting.deletePosting(req.params.id, req.decodedToken.id)
                .then((affectedRows) => {
                    if (affectedRows === 0) {
                        res.status(404).json({ error: 'posting not found' })
                    } else {
                        res.status(200).json({ message: 'posting deleted' });
                    }
                })
                .catch((err) => res.status(404).json({ error: err }));
        }
    );
};

