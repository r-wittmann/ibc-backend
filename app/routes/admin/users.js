// admin route to retrieve users and manage them

const User = include('app/models/user');
const validateToken = include('app/routes/api/validateToken');
const validateAdminToken = include('app/routes/admin/validateToken');
const mailService = include('app/mailService');


module.exports = function(app, path) {

    // get a list of all users
    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        validateAdminToken,
        function(req, res) {
            User.find({}, function(err, users) {

                if (err) res.status(500).send(err);

                // remove the calling admin user
                users = users.filter(user => !user._id.equals(req.decodedToken.id));

                // remove passwords from the user objects
                for (let user of users) {
                    user.password = undefined;
                }

                res.json(users);
            });
        }
    );

    // get one user by id
    app.get(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        validateAdminToken,
        function(req, res) {
            User.findById(req.params.id, function(err, user) {

                if (err) res.status(500).send(err);

                if (!user) {
                    res.json({ success: false, message: 'User not found' });
                } else {
                    // remove password from the user object
                    user.password = undefined;
                    res.json(user);
                }
            });
        });

    // accept the registration of a user
    app.patch(path + '/:id/accept',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        validateAdminToken,
        function(req, res) {
            User.findById(req.params.id, function(err, user) {

                if (err) res.status(500).send(err);

                if (!user) {
                    res.json({ success: false, message: 'User not found' });
                } else {
                    let newUser = user;
                    newUser.regAccepted = true;
                    User.findByIdAndUpdate(req.params.id, newUser, function(err, user) {
                        if (err) res.status(500).send(err);
                        mailService.sendApprovalMail(user.email);
                        res.json({ success: true });
                    });

                }
            });
        }
    );

    // decline the registration of a user (deleting it)
    app.delete(path + '/:id/decline',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        validateAdminToken,
        function(req, res) {
            User.findById(req.params.id, function(err, user) {
                if (err) res.status(500).send(err);

                if (!user) {
                    res.json({ success: false, message: 'User not found' });
                } else {
                    User.findByIdAndRemove(req.params.id, function(err, user) {
                        if (err) res.status(500).send(err);
                        mailService.sendDeclineMail(user.email);
                        res.json({ success: true });
                    })
                }
            });
        }
    );
};
