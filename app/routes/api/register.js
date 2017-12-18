// api route to register a users

const Account = include('app/orm/accountMapper');
const Company = include('app/orm/companyMapper');
const MailService = include('app/mailService');
const crypto = require('crypto');

module.exports = function(app, path) {

    app.post(path, function(req, res) {

        let salt = crypto.randomBytes(4).toString('hex');
        let password = 'dummyPassword';

        let account = {
            name: req.body.name,
            password: password,
            salt: salt,
            mother_company: req.body.mother_company,
            email: req.body.email,
            company_type: req.body.company_type,
            status: 'registered',
            admin: false
        };

        Account.createAccount(account)
            .then(([accountId]) => {
                let company = {
                    account_id: accountId,
                    company_name: req.body.mother_company,
                    contact_name: req.body.contact_name,
                    contact_email: req.body.contact_email,
                    contact_phone: req.body.contact_phone,
                    munich_address: req.body.address,
                    website: req.body.website
                };
                Company.createCompany(company)
                    .then(() => res.status(201).json('account created'))
                    .then(() => MailService.sendApprovalRequestedMail())
                    .catch((err) => res.status(409).send(err))
            })

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
