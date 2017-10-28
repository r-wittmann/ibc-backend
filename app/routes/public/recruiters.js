// public route to retrieve a list of recruiters or a single on by id
var Recruiter = include('app/models/recruiter');

module.exports = function(app, path) {

    app.get(path, function(req, res) {
        Recruiter.find({}, function(err, companies) {
            if (err) throw err;
            res.json(companies);
        })
    });

    app.get(path + '/:id', function(req, res) {
        Recruiter.findById(req.params.id, function(err, recruiter) {
            if (err) throw err;
            if (!recruiter) {
                res.json({ success: false, message: 'User not found' });
            } else {
                res.json(recruiter);
            }
        });
    });
};

