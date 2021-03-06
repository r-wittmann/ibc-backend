// admin route to retrieve a jwt token in exchange for username and password
// route: .../admin/authenticate

const Account = include('app/orm/accountMapper');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = function(app, path) {

    app.post(path, function(req, res) {
        // find the account
        Account.getByNameOrMail(req.body.name).then(([account]) => {
            if (!account) {
                // username doesn't exist
                res.status(403).json({ error: 'authentication failed. user doesn\'t exist or password is wrong' });
            } else if (account.password !== crypto.createHmac('sha512', account.salt).update(req.body.password).digest('hex')) {
                // password is incorrect
                res.status(403).send({ error: 'authentication failed. user doesn\'t exist or password is wrong' });
            } else if (!account.admin) {
                // username and password are correct but the user is not an admin
                res.status(403).send({ error: 'authentication failed, user is not an admin' });
            } else {
                let payload = {
                    id: account.id,
                    name: account.name,
                    admin: account.admin
                };
                let token = jwt.sign(payload, app.get('secret'), { expiresIn: '8h' });

                // return the token as JSON
                res.status(200).json({ token: token });
            }
        })
    })
};

