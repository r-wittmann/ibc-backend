// private route to retrieve a jwt token in exchange for email and password

const Account = include('app/orm/accountMapper');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = function(app, path) {

    app.post(path, function(req, res) {
        // find the account
        Account.getByNameOrMail([req.body.name, 'admin', 'IBC-Admin']).then((account) => {
            if (account[0].name === 'admin' || account[0].name === 'IBC-Admin') {
                console.log('doesn\'t exist');
                // username doesn't exist
                res.status(403).json({ error: 'authentication failed. user doesn\'t exist or password is wrong' });
            } else if (account[0].password !== crypto.createHmac('sha512', account[0].salt).update(req.body.password).digest('hex')
                        && account[1].password !== crypto.createHmac('sha512', account[1].salt).update(req.body.password).digest('hex')
                        && account[2] && account[2].password !== crypto.createHmac('sha512', account[2].salt).update(req.body.password).digest('hex')) {
                // password is incorrect
                res.status(403).json({ error: 'authentication failed. user doesn\'t exist or password is wrong' });
            } else {

                let payload = {
                    id: account[0].id,
                    name: account[0].name,
                    admin: account[0].admin
                };
                let token = jwt.sign(payload, app.get('secret'), { expiresIn: '8h'});

                // return the token as JSON
                res.status(200).json({ token: token });
            }
        })
    });
};

