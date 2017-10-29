// api route to register a users

const User = include('app/models/user');

module.exports = function(app, path) {

    app.post(path, function(req, res) {

        User.findOne({ name: req.body.name }, function(err, user) {
            if (err) res.status(500).send(err);

            if (!user) {
                // create user
                let newUser = new User({
                    name: req.body.name,
                    password: req.body.password,
                    admin: false,
                    regAccepted: false
                });

                // save the user
                newUser.save(function(err) {
                    if (err) res.status(500).send(err);
                    res.json({ success: true, id: newUser._id });
                });
            } else {
                res.json({ success: false, message: 'User already exists' });
            }
        });
    });

};
