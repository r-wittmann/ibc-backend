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
            let posting = new Posting(Object.assign({}, { owner: req.decodedToken.id }, req.body));
            posting.save(function(err) {
                if (err) res.status(500).send(err);
                res.send({ success: true, id: posting._id });
            })
        }
    );

    // get a list of job postings (only id, company, recruiter, title and subtitle)
    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Posting.find({}, function(err, postings) {
                if (err) res.status(500).send(err);
                res.json(postings
                    .filter(posting => posting.owner === req.decodedToken.id)
                    .map(posting => ({
                        _id: posting._id,
                        company: posting.company,
                        recruiter: posting.recruiter,
                        title: posting.title,
                        subtitle: posting.subtitle
                    }))
                );
            })
        });

    // get a job posting by id
    app.get(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Posting.findById(req.params.id, function(err, posting) {
                if (err) res.status(500).send(err);
                if (!posting || posting.owner !== req.decodedToken.id) {
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

                if (!posting || posting.owner !== req.decodedToken.id) {
                    res.json({ success: false, message: 'Posting not found' });
                } else {
                    Posting.findByIdAndUpdate(req.params.id, req.body.posting, function(err, posting) {
                        if (err) res.status(500).send(err);
                        res.json({ success: true, id: posting._id });
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
            Posting.findById(req.params.id, function(err, posting) {
                if (err) res.status(500).send(err);
                if (!posting || posting.owner !== req.decodedToken.id) {
                    res.json({ success: false, message: 'Posting not found' });
                } else {
                    posting.remove();
                    res.json({ success: true });
                }
            });
        }
    );
};

