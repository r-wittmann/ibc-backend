// private route to retrieve and update company details

const Company = include('app/models/company');
const validateToken = include('app/routes/api/validateToken');

module.exports = function(app, path) {

    // create new company
    app.post(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {

            let company = new Company({
                owner: req.decodedToken.id,
                name: req.body.name,
                address: req.body.address,
                recruiters: [req.body.recruiters]
            });

            company.save(function(err) {
                if (err) throw err;
                res.json({ success: true });
            });
        }
    );

    // get list of companies
    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Company.find({}, function(err, companies) {
                if (err) throw err;
                res.json(companies);
            })
        }
    );

    // get company by id
    app.get(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Company.findById(req.params.id, function(err, company) {
                if (err) throw err;
                if (!company) {
                    res.json({ success: false, message: 'Company not found' });
                } else {
                    res.json(company);
                }
            });
        }
    );

    // update a company
    app.put(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Company.findById(req.params.id, function(err, company) {
                if (err) throw err;
                if (!company) {
                    res.json({ success: false, message: 'Company not found' });
                } else {
                    let newCompany = Object.assign(company, req.body);
                    newCompany.save(function(err) {
                        if (err) throw err;
                        res.json({ success: true });
                    });
                }
            });
        }
    );

    // delete a company
    app.delete(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Company.remove({ _id: req.params.id }, function(err, company) {
                if (err) throw err;
                if (!company) {
                    res.json({ success: false, message: 'Company not found' });
                } else {
                    res.json({ success: true });
                }
            });
        }
    );
};
