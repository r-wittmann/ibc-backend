// private route to retrieve a list of recruiters or a single on by id

const Recruiter = include('app/models/recruiter');
const validateToken = include('app/routes/api/validateToken');

module.exports = function(app, path) {

    // create a recruiter
    app.post(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            let recruiter = new Recruiter(req.body);
            recruiter.save(function(err) {
                if (err) res.status(500).send(err);
                res.send({ success: true });
            })
        }
    );

    // get a list of recruiters, not filtered for company yet
    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Recruiter.find({}, function(err, companies) {
                if (err) res.status(500).send(err);
                res.json(companies);
            })
        });

    // get one recruiter by id, not filtered for company yet
    app.get(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Recruiter.findById(req.params.id, function(err, recruiter) {
                if (err) res.status(500).send(err);
                if (!recruiter) {
                    res.json({ success: false, message: 'Recruiter not found' });
                } else {
                    res.json(recruiter);
                }
            });
        });

    // update a job recruiter
    app.put(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Recruiter.findById(req.params.id, function(err, recruiter) {
                if (err) res.status(500).send(err);
                if (!recruiter) {
                    res.json({ success: false, message: 'Recruiter not found' });
                } else {
                    let newRecruiter = Object.assign(recruiter, req.body);
                    newRecruiter.save(function(err) {
                        if (err) res.status(500).send(err);
                        res.json({ success: true });
                    });
                }
            });
        }
    );

    // delete a recruiter
    app.delete(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Recruiter.remove({ _id: req.params.id }, function(err, recruiter) {
                if (err) res.status(500).send(err);
                if (!recruiter) {
                    res.json({ success: false, message: 'Recruiter not found' });
                } else {
                    res.json({ success: true });
                }
            });
        }
    );
};

