// private route to retrieve company details including sub companies and recruiters.
var Company = include('app/models/company');
var validateToken = include('app/routes/api/validateToken');

module.exports = function(app, path) {
    // endpoint for creating a company is still missing

    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Company.find({}, function(err, companies) {
                if (err) throw err;
                res.json(companies);
            })
        });

    app.get(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Company.findById(req.params.id, function(err, company) {
                if (err) throw err;
                if (!company) {
                    res.json({ success: false, message: 'User not found' });
                } else {
                    res.json(company);
                }
            });
        });

    // endpoint for updating a company is still missing
};
