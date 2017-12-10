// private route to retrieve and update company details

const validateToken = include('app/routes/api/validateToken');

module.exports = function(afpp, path) {

    // // get the users profile
    // app.get(path,
    //     function(req, res, next) {
    //         validateToken(req, res, next, app);
    //     },
    //     function(req, res) {
    //         User.findById(req.decodedToken.id, function(err, profile) {
    //
    //             if (err) res.status(500).send(err);
    //
    //             if (!profile) {
    //                 res.json({ success: false, message: 'Profile not found' });
    //             }
    //
    //             res.json(profile);
    //         })
    //     }
    // );
    //
    // // update a company
    // app.put(path,
    //     function(req, res, next) {
    //         validateToken(req, res, next, app);
    //     },
    //     function(req, res) {
    //         User.findByIdAndUpdate(req.decodedToken.id, req.body, { new: true }, function(err, profile) {
    //
    //             if (err) res.status(500).send(err);
    //
    //             if (!profile) {
    //                 res.json({ success: false, message: 'Profile not found' });
    //             } else {
    //                 res.json({ success: true, profile });
    //             }
    //         });
    //     });
};
