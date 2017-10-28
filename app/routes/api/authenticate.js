// private route to retrieve a jwt token in exchange for username and password
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User = include('app/models/user.js');

module.exports = function(app, path) {

    app.post(path, function(req, res) {

        // find the user
        User.findOne({ name: req.body.name }, function(err, user) {

            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (err) throw err;
                    if (!isMatch) {
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    } else if (isMatch) {
                        // if user is found and password is right
                        // create a token the given payload
                        const payload = {
                            name: user.name,
                            admin: user.admin
                        };
                        var token = jwt.sign(payload, app.get('secret'));

                        // return the information including token as JSON
                        res.json({
                            success: true,
                            token: token
                        });
                    }
                });
            }
        });
    });
};

