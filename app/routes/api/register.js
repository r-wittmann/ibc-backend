// admin route to retrieve users and manage them
const User = include('app/models/user');

module.exports = function(app, path) {

    app.post(path, function(req, res) {

        User.findOne({ name: req.body.name }, function(err, user) {
            if (err) throw err;

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
                    if (err) throw err;
                    res.json({ success: true });
                });
            } else {
                res.json({ success: false, message: 'User already exists' });
            }
        });
    });

};
