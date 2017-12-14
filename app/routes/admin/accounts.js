// admin route to retrieve users and manage them

const Account = include('app/orm/accountMapper');
const validateToken = include('app/routes/api/validateToken');
const validateAdminToken = include('app/routes/admin/validateToken');
const MailService = include('app/mailService');


module.exports = function(app, path) {

    // get a list of all users
    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        validateAdminToken,
        function(req, res) {
            Account.getAllAccountsForAdmin()
                .then((accounts) => {
                    // remove the calling admin user
                    accounts = accounts.filter(account => account.id !== req.decodedToken.id);
                    // only get the first occurrence of each account id
                    let uniqueAccounts = accounts.filter(function(account, index, self) {
                        return self.findIndex(a => a.id === account.id) === index;
                    });
                    res.status(200).json(uniqueAccounts);
                })
                .catch((err) => res.status(400).send(err));
        });

    // accept the registration of a user
    app.patch(path + '/:id/accept',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        validateAdminToken,
        function(req, res) {
            let updateObject = {
                status: 'accepted'
            };
            Account.getById(req.params.id)
                .then(([account]) => {
                    Account.updateAccount(account.id, updateObject)
                        .then(() => res.status(200).json({'message': 'registration accepted'}))
                        .then(() => MailService.sendApprovalMail(account.email))
                        .catch((err) => res.status(400).send(err));
                })
                .catch((err) => res.status(404).send(err));
        });

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
                        .then(() => res.status(200).json({'message': 'registration declined'}))
                        // TODO: open mailTo in the frontend
                        .catch((err) => res.status(400).send(err));
                })
                .catch((err) => res.status(404).send(err));
        });
};
