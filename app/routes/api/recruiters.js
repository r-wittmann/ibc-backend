// private route to retrieve a list of recruiters or a single on by id

const validateToken = include('app/routes/api/validateToken');

module.exports = function(app, path) {

    // // create a recruiter
    // app.post(path,
    //     function(req, res, next) {
    //         validateToken(req, res, next, app);
    //     },
    //     function(req, res) {
    //
    //         let recruiter = Object.assign({}, { owner: req.decodedToken.id }, req.body);
    //
    //         Recruiter.create(recruiter, function(err, recruiter) {
    //             if (err) res.status(500).send(err);
    //             res.send({ success: true, id: recruiter._id });
    //         });
    //     }
    // );
    //
    // // get a list of recruiters (only id, name and email)
    // app.get(path,
    //     function(req, res, next) {
    //         validateToken(req, res, next, app);
    //     },
    //     function(req, res) {
    //         Recruiter.find({}, function(err, recruiters) {
    //             if (err) res.status(500).send(err);
    //             res.json(recruiters
    //                 .filter(recruiter => recruiter.owner === req.decodedToken.id)
    //                 .map(recruiter => ({
    //                     _id: recruiter._id,
    //                     name: recruiter.name,
    //                     email: recruiter.email,
    //                 }))
    //             );
    //         })
    //     });
    //
    // // get one recruiter by id
    // app.get(path + '/:id',
    //     function(req, res, next) {
    //         validateToken(req, res, next, app);
    //     },
    //     function(req, res) {
    //         Recruiter.findById(req.params.id, function(err, recruiter) {
    //             if (err) res.status(500).send(err);
    //             if (!recruiter || recruiter.owner !== req.decodedToken.id) {
    //                 res.json({ success: false, message: 'Recruiter not found' });
    //             } else {
    //                 res.json(recruiter);
    //             }
    //         });
    //     });
    //
    // // update a recruiter
    // app.put(path + '/:id',
    //     function(req, res, next) {
    //         validateToken(req, res, next, app);
    //     },
    //     function(req, res) {
    //         Recruiter.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, recruiter) {
    //             if (err) res.status(500).send(err);
    //
    //             if (!recruiter || recruiter.owner !== req.decodedToken.id) {
    //                 res.json({ success: false, message: 'Recruiter not found' });
    //             } else {
    //                 res.json({ success: true, recruiter });
    //             }
    //         });
    //     }
    // );
    //
    // // delete a recruiter
    // app.delete(path + '/:id',
    //     function(req, res, next) {
    //         validateToken(req, res, next, app);
    //     },
    //     function(req, res) {
    //         Recruiter.findByIdAndRemove(req.params.id, function(err, recruiter) {
    //             if (err) res.status(500).send(err);
    //
    //             if (!recruiter || recruiter.owner !== req.decodedToken.id) {
    //                 res.json({ success: false, message: 'Recruiter not found' });
    //             } else {
    //                 Posting.deleteMany({ recruiter: req.params.id }, function(err) {
    //                 });
    //                 res.json({ success: true });
    //             }
    //         });
    //     }
    // );
};

