// admin route to retrieve users and manage them
var User = include('app/models/user');
var validateToken = include('app/routes/api/validateToken');
var validateAdminToken = include('app/routes/admin/validateToken');

module.exports = function(app, path) {

    // endpoint for creating a user is still missing

    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        validateAdminToken,
        function(req, res) {
            User.find({}, function(err, users) {
                if (err) throw err;
                res.json(users);
            });
        }
    );

    app.get(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            User.findById(req.params.id, function(err, user) {
                if (err) throw err;
                if (!user) {
                    res.json({ success: false, message: 'User not found' });
                } else {
                    res.json(user);
                }
            });
        });

    app.put(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            User.findById(req.params.id, function(err, user) {
                if (err) throw err;
                if (!user) {
                    res.json({ success: false, message: 'User not found' });
                } else {
                    user.regAccepted = req.body.regAccepted;
                    user.save(function(err, user) {
                        if (err) throw err;
                        res.json(user);
                    })
                }
            })
        });
};
