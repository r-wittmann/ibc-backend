// admin route to retrieve users and manage them

const Account = include('app/orm/account');
const validateToken = include('app/routes/api/validateToken');
const validateAdminToken = include('app/routes/admin/validateToken');
const mailService = include('app/mailService');


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
    })

    // // get one user by id
    // app.get(path + '/:id',
    //     function(req, res, next) {
    //         validateToken(req, res, next, app);
    //     },
    //     validateAdminToken,
    //     function(req, res) {
    //         User.findById(req.params.id, function(err, user) {
    //
    //             if (err) res.status(500).send(err);
    //
    //             if (!user) {
    //                 res.json({ success: false, message: 'User not found' });
    //             } else {
    //                 // remove password from the user object
    //                 user.password = undefined;
    //                 res.json(user);
    //             }
    //         });
    //     });
    //
    // // accept the registration of a user
    // app.patch(path + '/:id/accept',
    //     function(req, res, next) {
    //         validateToken(req, res, next, app);
    //     },
    //     validateAdminToken,
    //     function(req, res) {
    //         User.findByIdAndUpdate(req.params.id, { regAccepted: true }, function(err, user) {
    //             if (err) res.status(500).send(err);
    //
    //             if (!user) {
    //                 res.json({ success: false, message: 'User not found' });
    //             } else {
    //                 mailService.sendApprovalMail(user.email);
    //                 res.json({ success: true });
    //             }
    //         });
    //     }
    // );
    //
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
