// private route to retrieve a jwt token in exchange for email and password

const Account = include('app/orm/account');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = function(app, path) {

    app.post(path, function(req, res) {
        // find the account
        Account.getByName(req.body.name).then(([account]) => {
            if (!account) {
                res.status(403).send('authentication failed. user doesn\'t exist or password is wrong');
            } else if (account.password !== crypto.createHmac('sha512', account.salt).update(req.body.password).digest('hex')) {
                res.status(403).send('authentication failed, user doesn\'t exist or password is wrong');
            } else {

                let payload = {
                    id: account.id,
                    name: account.name,
                    admin: account.admin
                };
                let token = jwt.sign(payload, app.get('secret'), { expiresIn: '8h'});

                // return the information including token as JSON
                res.status(200).send(token);
            }
        })
    });
};

