// private route to retrieve and update company details

const Company = include('app/orm/companyMapper');
const defaultCompany = include('app/models/defaultCompany');

const validateToken = include('app/routes/api/validateToken');

module.exports = function(app, path) {

    // create new company
    app.post(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            let company = Object.assign(defaultCompany, { account_id: req.decodedToken.id }, req.body);

            Company.createCompany(company)
                .then(([id]) => res.status(201).json({ company_id: id }))
                .catch((err) => res.status(400).json({ error: err }));
        }
    );

    // get a list of companies (only company name and id) for a account id
    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Company.getByAccountIdWithSelect(req.decodedToken.id)
                .then((companies) => {
                    let responseObject = companies.filter(company => company.status !== 'deactivated');
                    res.status(200).json(responseObject);
                })
                .catch((err) => res.status(400).json({ error: err }));
        }
    );

    // get one company by id
    app.get(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Company.getByIdAndAccountId(req.params.id, req.decodedToken.id)
                .then(([company]) => {
                    if (!company) {
                        res.status(404).json({ error: 'company not found' })
                    } else {
                        company.logo = company.logo ? company.logo.toString() : null;
                        res.status(200).json(company);
                    }
                })
                .catch((err) => res.status(400).json({ error: err }));
        }
    );

    // update a company
    app.put(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Company.updateCompany(req.params.id, req.decodedToken.id, req.body)
                .then((affectedRows) => {
                    if (affectedRows === 0) {
                        res.status(404).json({ error: 'company not found' })
                    } else {
                        res.status(200).json({ message: 'company updated' });
                    }
                })
                .catch((err) => res.status(400).json({ error: err }));
        }
    );

    // delete a company
    app.delete(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Company.deleteCompany(req.params.id, req.decodedToken.id)
                .then((affectedRows) => {
                    if (affectedRows === 0) {
                        res.status(404).json({ error: 'company not found' })
                    } else {
                        res.status(200).json({ message: 'company deleted' });
                    }
                })
                .catch((err) => res.status(404).json({ error: err }));
        }
    );
};
