// private route to retrieve a list of job postings or a single one by id
// route: .../api/postings

const Posting = include('app/orm/postingMapper');
const defaultPosting = include('app/models/defaultPosting');

const validateToken = include('app/routes/api/validateToken');

module.exports = function(app, path) {

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

