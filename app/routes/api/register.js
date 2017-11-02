// api route to register a users

const User = include('app/models/user');
const mailService = include('app/mailService');

module.exports = function(app, path) {

    app.post(path, function(req, res) {

        User.findOne({ email: req.body.email }, function(err, user) {
            if (err) res.status(500).send(err);

            if (!user) {
                // create user
                let newUser = new User(Object.assign({}, req.body, {
                    admin: false,
                    regAccepted: false
                }));

                // save the user
                newUser.save(function(err) {
                    if (err) res.status(500).send(err);
                    mailService.sendApprovalRequestedMail();
                    res.json({ success: true, id: newUser._id });
                });
            } else {
                res.json({ success: false, message: 'User already exists' });
            }
        });
    });

};
