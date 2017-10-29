// private route to retrieve a list of job postings or a single one by id

const Posting = include('app/models/posting');
const validateToken = include('app/routes/api/validateToken');

module.exports = function(app, path) {

    // create a job posting
    app.post(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            let posting = new Posting(req.body);
            posting.save(function(err) {
                if (err) res.status(500).send(err);
                res.send({ success: true });
            })
        }
    );

    // get a list of job postings, not filtered for company yet
    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Posting.find({}, function(err, postings) {
                if (err) res.status(500).send(err);
                res.json(postings);
            })
        });

    // get a job posting by id, not filtered for company yet
    app.get(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Posting.findById(req.params.id, function(err, posting) {
                if (err) res.status(500).send(err);
                if (!posting) {
                    res.json({ success: false, message: 'User not found' });
                } else {
                    res.json(posting);
                }
            });
        });

    // update a job posting
    app.put(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Posting.findById(req.params.id, function(err, posting) {
                if (err) res.status(500).send(err);
                if (!posting) {
                    res.json({ success: false, message: 'Posting not found' });
                } else {
                    let newPosting = Object.assign(posting, req.body);
                    newPosting.save(function(err) {
                        if (err) res.status(500).send(err);
                        res.json({ success: true });
                    });
                }
            });
        }
    );

    // delete a posting
    app.delete(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Posting.remove({ _id: req.params.id }, function(err, posting) {
                if (err) res.status(500).send(err);
                if (!posting) {
                    res.json({ success: false, message: 'Posting not found' });
                } else {
                    res.json({ success: true });
                }
            });
        }
    );
};

