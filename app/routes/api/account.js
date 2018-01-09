// private route to retrieve and update company details
// route: .../api/account

const Account = include('app/orm/accountMapper');
const validateToken = include('app/routes/api/validateToken');
const crypto = require('crypto');

module.exports = function(app, path) {

    // get the users profile
    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Account.getByIdWithSelect(req.decodedToken.id)
                .then(([account]) => {
                    res.status(200).json(account)
                })
                .catch((err) => res.status(400).json({ error: err }));
        });

    // update a account
    app.patch(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            // remove attributes which can't be updated (at this endpoint)
            delete(req.body.id);
            delete(req.body.name);
            delete(req.body.password);
            delete(req.body.status);
            delete(req.body.admin);

            Account.updateAccount(req.decodedToken.id, req.body)
                .then(() => res.status(200).json({ message: 'account updated' }))
                .catch((err) => res.status(400).json({ error: err }));
        });

    // change password
    app.patch(path + '/password',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Account.getById(req.decodedToken.id)
                .then(([account]) => {
                    if (account.password !== crypto.createHmac('sha512', account.salt).update(req.body.oldPassword).digest('hex')) {
                        res.status(401).json({ error: 'old password is wrong' });
                    } else {
                        // generate a new salt and hash the new password before saving both to the database
                        let salt = crypto.randomBytes(4).toString('hex');
                        let hashedPassword = crypto.createHmac('sha512', salt).update(req.body.newPassword).digest('hex');
                        let updateObject = {
                            salt,
                            password: hashedPassword
                        };
                        Account.updateAccount(account.id, updateObject)
                            .then(() => res.status(200).json({ message: 'password updated' }))
                            .catch((err) => res.status(400).json({ error: err }));
                    }
                })
                .catch((err) => res.status(400).json({ error: err }));
        });
};
