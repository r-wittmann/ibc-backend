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
                        let timeToExpire = new Date(posting.expiry_date) - new Date();
                        if (timeToExpire < 0) {
                            // if the expiry date of the posting is before the current date:
                            // update posting status
                            Posting.updatePosting(posting.id, posting.account_id, { status: 'deactivated', expiry_date: '' })
                                .then(() => console.log('posting', posting.id , 'updated to status: deactivated'));
                        } else if (timeToExpire < msPerDay || timeToExpire > 6 * msPerDay && timeToExpire < 7 * msPerDay) {
                            // send soon to expire mail twice. Once, if the post expires in less than 7 days and once,
                            // if the posting expires in less than one day to remind them of the posting
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
                            // if the query key is either company_id or recruiter_id (the only two values saved as an int in the database
                            if (key === 'company_id' || key === 'recruiter_id') {
                                // if the query contains more than one element, we must parse the strings to ints to allow the comparison
                                if(filters[key] instanceof Array) {
                                    filters[key] = filters[key].map(e => parseInt(e));
                                } else {
                                    // if the query contains only one element, we must parse the string and wrap it in an array for the comparison
                                    filters[key] = Array.of(parseInt(filters[key]));
                                }
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

