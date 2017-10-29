// public route to retrieve a list of recruiters or a single on by id

const Recruiter = include('app/models/recruiter');

module.exports = function(app, path) {

    // get a list of recruiters
    app.get(path, function(req, res) {
        Recruiter.find({}, function(err, companies) {
            if (err) res.status(500).send(err);
            res.json(companies);
        })
    });

    // get a recruiter by id
    app.get(path + '/:id', function(req, res) {
        Recruiter.findById(req.params.id, function(err, recruiter) {
            if (err) res.status(500).send(err);
            if (!recruiter) {
                res.json({ success: false, message: 'User not found' });
            } else {
                res.json(recruiter);
            }
        });
    });
};

