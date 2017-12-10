// admin route to retrieve users and manage them

const Account = include('app/orm/account');
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
            Account.getAllAccounts()
                .then((accounts) => {
                    accounts.forEach(account => account.password = undefined);
                    accounts.forEach(account => account.salt = undefined);
                    res.status(200).json(accounts);
                })
                .catch((err) => res.status(400).send(err));
        });

    // get one user by id
    app.get(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        validateAdminToken,
        function(req, res) {
            Account.getById(req.params.id)
                .then(([account]) => {
                    account.password = undefined;
                    account.salt = undefined;
                    res.status(200).json(account);
                })
                .catch((err) => res.status(404).send(err));
        });

    // accept the registration of a user
    app.patch(path + '/:id/accept',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        validateAdminToken,
        function(req, res) {
            let updateObject = {
                reg_accepted: true
            };
            Account.getById(req.params.id)
                .then(([account]) => {
                    Account.updateAccount(account.id, updateObject)
                        .then(() => res.status(200).send('registration accepted'))
                        .then(() => MailService.sendApprovalMail(account.mail))
                        .catch((err) => res.status(400).send(err));
                })
                .catch((err) => res.status(404).send(err));
        }
    )
    
    // // decline the registration of a user (deleting it)
    // app.delete(path + '/:id/decline',
    //     function(req, res, next) {
    //         validateToken(req, res, next, app);
    //     },
    //     validateAdminToken,
    //     function(req, res) {
    //         User.findByIdAndRemove(req.params.id, function(err, user) {
    //             if (err) res.status(500).send(err);
    //
    //             if (!user) {
    //                 res.json({ success: false, message: 'User not found' });
    //             } else {
    //                 mailService.sendDeclineMail(user.email);
    //                 res.json({ success: true });
    //             }
    //         });
    //     }
    // );
};
