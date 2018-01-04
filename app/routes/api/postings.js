// private route to retrieve a list of job postings or a single one by id

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

    // get a list of job postings (only id, title, status, expiry_date)
    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            let filters = [];
            for (let key in req.query) {
                if (req.query.hasOwnProperty(key) && defaultPosting.hasOwnProperty(key)) {
                    filters[`t_posting.${key}`] = req.query[key];
                }
            }
            Posting.getByAccountIdWithSelect(req.decodedToken.id, filters)
                .then((postings) => {
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

