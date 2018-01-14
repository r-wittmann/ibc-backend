// api route to register an account
// route: ../api/register

const Account = include('app/orm/accountMapper');
const Company = include('app/orm/companyMapper');
const defaultCompany = include('app/models/defaultCompany');
const MailService = include('app/mailService');
const crypto = require('crypto');

module.exports = function(app, path) {

    // check, if a username is already taken
    app.post(path + '/check-username', function(req, res) {
        Account.getByName(req.body.name)
            .then(([account]) => {
                if (account) {
                    res.status(400).json({ error: 'username already exists' });
                } else {
                    res.status(200).json({ message: 'username is ok' });
                }
            })
            .catch((err) => res.status(400).json({ error: err }));
    });

    // register an account (creates an account and a company)
    app.post(path, function(req, res) {

        // as a password is created for the account once an admin accepts the registration,
        // we save a dummy password to the database which can't be used to login
        let salt = crypto.randomBytes(4).toString('hex');
        let password = 'dummyPassword';

        let account = {
            name: req.body.name,
            password: password,
            salt: salt,
            email: req.body.email,
            company_type: req.body.company_type,
            status: 'registered',
            admin: false
        };

        Account.createAccount(account)
            .then(([accountId]) => {
                let company = {
                    account_id: accountId,
                    company_name: req.body.name,
                    contact_name: req.body.contact_name,
                    contact_email: req.body.contact_email,
                    contact_phone: req.body.contact_phone,
                    munich_address: req.body.address,
                    website: req.body.website,
                    company_description: defaultCompany.company_description
                };
                Company.createCompany(company)
                    .then(() => res.status(201).json({ message: 'account created' }))
                    .then(() => MailService.sendApprovalRequestedMail())
                    .catch((err) => res.status(409).json({ error: err }))
            })

    });

    // endpoint to create a new password for an account
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
                .then(() => res.status(200).json({ message: 'new password created' }))
                .then(() => MailService.sendNewPasswordMail(account.email, password));
        }).catch(() => res.status(403).json({ error: 'account doesn\'t exist' }));
    })
};
