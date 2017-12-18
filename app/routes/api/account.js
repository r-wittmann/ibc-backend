// private route to retrieve and update company details

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
                .catch((err) => res.status(404).send('account not found'));
        });

    // update a account
    app.patch(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            delete(req.body.id);
            delete(req.body.name);
            delete(req.body.password);
            delete(req.body.reg_accepted);
            delete(req.body.admin);

            Account.updateAccount(req.decodedToken.id, req.body)
                .then(() => res.status(200).send('account updated'))
                .catch((err) => res.status(404).send('account not found'));
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
                        res.status(403).send('old password is wrong');
                    } else {
                        let salt = crypto.randomBytes(4).toString('hex');
                        let hashedPassword = crypto.createHmac('sha512', salt).update(req.body.newPassword).digest('hex');
                        let updateObject = {
                            salt,
                            password: hashedPassword
                        };
                        Account.updateAccount(account.id, updateObject)
                            .then(() => res.status(200).send('password updated'))
                            .catch((err) => res.status(400).send(err));
                    }
                });
        });
};
