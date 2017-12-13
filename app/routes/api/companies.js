// private route to retrieve and update company details

const validateToken = include('app/routes/api/validateToken');

module.exports = function(app, path) {

    // // create new company
    // app.post(path,
    //     function(req, res, next) {
    //         validateToken(req, res, next, app);
    //     },
    //     function(req, res) {
    //
    //         let company = Object.assign({}, { owner: req.decodedToken.id }, req.body);
    //
    //         Company.create(company, function(err, company) {
    //             if (err) res.status(500).send(err);
    //             res.json({ success: true, id: company._id });
    //         });
    //     }
    // );
    //
    // // get a list of companies (only email and id)
    // app.get(path,
    //     function(req, res, next) {
    //         validateToken(req, res, next, app);
    //     },
    //     function(req, res) {
    //         Company.find({}, function(err, companies) {
    //
    //             if (err) res.status(500).send(err);
    //
    //             res.json(companies
    //                 .filter(company => company.owner === req.decodedToken.id)
    //                 .map(company => ({
    //                     name: company.name,
    //                     _id: company._id
    //                 }))
    //             );
    //         })
    //     }
    // );
    //
    // // get one company by id
    // app.get(path + '/:id',
    //     function(req, res, next) {
    //         validateToken(req, res, next, app);
    //     },
    //     function(req, res) {
    //         Company.findById(req.params.id, function(err, company) {
    //
    //             if (err) res.status(500).send(err);
    //
    //             if (!company || company.owner !== req.decodedToken.id) {
    //                 res.json({ success: false, message: 'Company not found' });
    //             } else {
    //                 res.json(company);
    //             }
    //         });
    //     }
    // );
    //
    // // update a company
    // app.put(path + '/:id',
    //     function(req, res, next) {
    //         validateToken(req, res, next, app);
    //     },
    //     function(req, res) {
    //         Company.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, company) {
    //             if (err) res.status(500).send(err);
    //
    //             if (!company || company.owner !== req.decodedToken.id) {
    //                 res.json({ success: false, message: 'Company not found' });
    //             } else {
    //                 res.json({ success: true, company });
    //             }
    //         });
    //     }
    // );
    //
    // // delete a company
    // app.delete(path + '/:id',
    //     function(req, res, next) {
    //         validateToken(req, res, next, app);
    //     },
    //     function(req, res) {
    //         Company.findByIdAndRemove(req.params.id, function(err, company) {
    //             if (err) res.status(500).send(err);
    //
    //             if (!company || company.owner !== req.decodedToken.id) {
    //                 res.json({ success: false, message: 'Company not found' });
    //             } else {
    //                 Posting.deleteMany({ company: req.params.id }, function(err) {
    //                 });
    //                 res.json({ success: true });
    //             }
    //         });
    //     }
    // );
};
