// api route to register a users

const Account = include('app/orm/accountMapper');
const MailService = include('app/mailService');
const crypto = require('crypto');

module.exports = function(app, path) {

    app.post(path, function(req, res) {

        let salt = crypto.randomBytes(4).toString('hex');
        let password = crypto.createHmac('sha512', salt).update(req.body.password).digest('hex');

        let account = Object.assign({}, req.body, {
            salt: salt,
            password: password,
            status: 'registered',
            admin: false
        });

        Account.createAccount(account)
            .then(() => res.status(201).send('account created'))
            .then(() => MailService.sendApprovalRequestedMail())
            .catch((err) => res.status(409).send(err))
    });

    app.post(path + '/forgot', function(req, res) {

        let salt = crypto.randomBytes(4).toString('hex');
        let password = crypto.randomBytes(8).toString('hex');
        let hashedPassword = crypto.createHmac('sha512', salt).update(password).digest('hex');

        Account.getByName(req.body.name).then(([account]) => {
            let updateObject = {
                salt: salt,
                password: hashedPassword
            };

            Account.updateAccount(account.id, updateObject)
                .then(() => res.status(200).send('new password created'))
                .then(() => MailService.sendNewPasswordMail(account.email, password));
        }).catch(() => res.status(403).send('account doesn\'t exist'));
    })
};
