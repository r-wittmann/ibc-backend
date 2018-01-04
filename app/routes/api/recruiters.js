// private route to retrieve a list of recruiters or a single on by id

const Recruiter = include('app/orm/recruiterMapper');
const defaultRecruiter = include('app/models/defaultRecruiter');

const validateToken = include('app/routes/api/validateToken');

module.exports = function(app, path) {

    // create a recruiter
    app.post(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            let recruiter = Object.assign(defaultRecruiter, { account_id: req.decodedToken.id }, req.body);

            Recruiter.createRecruiter(recruiter)
                .then(([id]) => res.status(201).json({ recruiter_id: id }))
                .catch((err) => res.status(400).json({ error: err }));
        }
    );

    // get a list of recruiters (only id, name and email)
    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Recruiter.getByAccountIdWithSelect(req.decodedToken.id)
                .then((recruiters) => res.status(200).json(recruiters))
                .catch((err) => res.status(400).json({ error: err }));
        }
    );

    // get one recruiter by id
    app.get(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Recruiter.getByIdAndAccountId(req.params.id, req.decodedToken.id)
                .then(([recruiter]) => {
                    if (!recruiter) {
                        res.status(404).json({ error: 'recruiter not found' })
                    } else {
                        recruiter.photo = recruiter.photo ? recruiter.photo.toString() : null;
                        res.status(200).json(recruiter);
                    }
                })
                .catch((err) => res.status(400).json({ error: err }));
        }
    );

    // update a recruiter
    app.put(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Recruiter.updateRecruiter(req.params.id, req.decodedToken.id, req.body)
                .then((affectedRows) => {
                    if (affectedRows === 0) {
                        res.status(404).json({ error: 'recruiter not found' })
                    } else {
                        res.status(200).json({ message: 'recruiter updated' });
                    }
                })
                .catch((err) => res.status(400).json({ error: err }));
        }
    );

    // delete a recruiter
    app.delete(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Recruiter.deleteRecruiter(req.params.id, req.decodedToken.id)
                .then((affectedRows) => {
                    if (affectedRows === 0) {
                        res.status(404).json({ error: 'recruiter not found' })
                    } else {
                        res.status(200).json({ message: 'recruiter deleted' });
                    }
                })
                .catch((err) => res.status(404).json({ error: err }));
        }
    );
};

