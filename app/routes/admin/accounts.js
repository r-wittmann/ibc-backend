// admin route to retrieve accounts and manage them
// route: .../admin/accounts

const Account = include('app/orm/accountMapper');
const validateToken = include('app/routes/api/validateToken');
const validateAdminToken = include('app/routes/admin/validateToken');
const MailService = include('app/mailService');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


module.exports = function(app, path) {

    // get a list of all users
    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        validateAdminToken,
        function(req, res) {
            let filters = req.query;
            Account.getAllAccountsForAdmin()
                .then((accounts) => {
                    // remove the calling admin user
                    accounts = accounts.filter(account => account.id !== req.decodedToken.id);
                    // only get the first occurrence of each account id
                    // because we do a join of the account table with the company table and each account can have
                    // multiple companies, each account can be in this list multiple times.
                    let uniqueAccounts = accounts.filter(function(account, index, self) {
                        return self.findIndex(a => a.id === account.id) === index;
                    });
                    // iterate over query parameters, check, if they are valid parameters for filtering and than
                    // filter for them on the account array
                    for (let key in filters) {
                        if (filters.hasOwnProperty(key) && (key === 'status' || key === 'company_type')) {
                            uniqueAccounts = uniqueAccounts.filter(account => filters[key].includes(account[key]));
                        }
                    }
                    res.status(200).json(uniqueAccounts);
                })
                .catch((err) => res.status(400).json({ error: err }));
        }
    );

    // update an account
    app.patch(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        validateAdminToken,
        function(req, res) {
            Account.updateAccount(req.params.id, req.body)
                .then((affectedRows) => {
                    if (affectedRows === 0) {
                        res.status(404).json({ error: 'account not found' })
                    } else {
                        res.status(200).json({ message: 'account updated' });
                    }
                })
                .catch((err) => res.status(400).json({ error: err }));
        }
    );

    // accept the registration of a user
    app.patch(path + '/:id/accept',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        validateAdminToken,
        function(req, res) {
            // generate a random password for the account which is sent to the user via email
            // this replaces the 'verify email' step in the registration process
            let salt = crypto.randomBytes(4).toString('hex');
            let password = crypto.randomBytes(8).toString('hex');
            let hashedPassword = crypto.createHmac('sha512', salt).update(password).digest('hex');

            let updateObject = {
                salt,
                password: hashedPassword,
                status: 'accepted',
                company_type: req.body.company_type
            };
            Account.getById(req.params.id)
                .then(([account]) => {
                    Account.updateAccount(account.id, updateObject)
                        .then(() => {
                            let payload = {
                                id: account.id,
                                name: account.name,
                                admin: false
                            };
                            let token = jwt.sign(payload, app.get('secret'), { expiresIn: '7d'});
                            MailService.sendAcceptanceMail(account.email, password, token, account.contact_name, account.name);
                        })
                        .then(() => res.status(200).json({ message: 'registration accepted' }))
                        .catch((err) => res.status(400).json({ error: err }));
                })
                .catch((err) => res.status(404).send({ error: err }));
        }
    );

    // decline the registration of a user
    app.patch(path + '/:id/decline',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        validateAdminToken,
        function(req, res) {
            let updateObject = {
                status: 'declined'
            };
            Account.getById(req.params.id)
                .then(([account]) => {
                    Account.updateAccount(account.id, updateObject)
                        .then(() => res.status(200).json({ message: 'registration declined' }))
                        // no need to send an email here because the mail application is opened on client side
                        .catch((err) => res.status(400).send({ error: err }));
                })
                .catch((err) => res.status(404).send({ error: err }));
        }
    );

    // delete an account
    app.delete(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        validateAdminToken,
        function(req, res) {
            Account.deleteAccount(req.params.id)
                .then((affectedRows) => {
                    if (affectedRows === 0) {
                        res.status(404).json({ error: 'account not found' })
                    } else {
                        res.status(200).json({ message: 'account deleted' });
                    }
                })
                .catch((err) => res.status(404).json({ error: err }));
        }
    );

    // get account analytics
    app.get(path + '/analytics',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        validateAdminToken,
        function(req, res) {
            Account.getAnalytics()
                .then((accounts) => {
                    // remove the calling admin user
                    accounts = accounts.filter(account => account.id !== req.decodedToken.id);
                    // rename active posting count column
                    accounts.map(company => company['activePostingCount'] = company['sum(`t_posting`.`status` = \'active\')']);
                    res.status(200).json(accounts);
                })
                .catch((err) => res.status(400).json({ error: err }));
        }
    );
};
