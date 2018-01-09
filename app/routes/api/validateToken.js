const jwt = require('jsonwebtoken');

module.exports = function(req, res, next, app) {
    // check header for token
    let token = req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('secret'), function(err, decoded) {
            if (err) {
                return res.status(403).json({ error: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save decoded token as parameter to the request for later use
                req.decodedToken = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).json({ error: 'No token provided.' });
    }
};
