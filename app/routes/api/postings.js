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
            Posting.getByAccountIdWithSelect(req.decodedToken.id)
                .then((postings) => res.status(200).json(postings))
                .catch((err) => res.status(400).json({ error: err }));

            //TODO: implement filtering
            // // if there are query parameters, iterate over them,
            // // check if they are actually fields of postings and than filter for the provided value
            // for (let key in req.query) {
            //     if (req.query.hasOwnProperty(key) && key in postings[0]) {
            //         console.log(key, ':', req.query[key]);
            //         postings = postings.filter(posting => posting[key] === req.query[key]);
            //     }
            // }
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

