// admin route to retrieve a jwt token in exchange for username and password

const jwt = require('jsonwebtoken');
const User = include('app/models/user.js');

module.exports = function(app, path) {

    app.post(path, function(req, res) {

        // find the user
        User.findOne({ name: req.body.name }, function(err, user) {

            if (err) res.status(500).send(err);

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user && user.admin) {

                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (err) res.status(500).send(err);
                    if (!isMatch) {
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    } else if (isMatch) {
                        // if user is found and password is right
                        // create a token the given payload
                        let payload = {
                            id: user._id,
                            name: user.name,
                            admin: user.admin
                        };
                        let token = jwt.sign(payload, app.get('secret'));

                        // return the information including token as JSON
                        res.json({ success: true, token: token });
                    }
                });
            } else {
                res.status(403).send('User is not an admin');
            }
        });
    });
};

