// api route to register a users

const Account = include('app/orm/account');
const MailService = include('app/mailService');
const crypto = require('crypto');

module.exports = function(app, path) {

    app.post(path, function(req, res) {

        let salt = crypto.randomBytes(4).toString('hex');
        let password = crypto.createHmac('sha512', salt).update(req.body.password).digest('hex');

        let account = Object.assign({}, req.body, {
            salt: salt,
            password: password,
            reg_accepted: false,
            admin: false
        });

        Account.createAccount(account)
            .then(() => res.status(201).send('account created'))
            .then(() => MailService.sendApprovalRequestedMail())
            .catch((err) => res.status(409).send(err))
    })
};
