// private route to retrieve a list of recruiters or a single on by id
var Recruiter = include('app/models/recruiter');
var validateToken = include('app/routes/api/validateToken');

module.exports = function(app, path) {
    // endpoint for creating a recruiter is still missing

    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Recruiter.find({}, function(err, companies) {
                if (err) throw err;
                res.json(companies);
            })
        });

    app.get(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Recruiter.findById(req.params.id, function(err, recruiter) {
                if (err) throw err;
                if (!recruiter) {
                    res.json({ success: false, message: 'User not found' });
                } else {
                    res.json(recruiter);
                }
            });
        });

    // endpoint for updating a recruiter is still missing
};

