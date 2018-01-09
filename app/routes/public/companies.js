// public route to retrieve company details
// route: .../public/companies

const Company = include('app/orm/companyMapper');

module.exports = function(app, path) {

    // get a list of companies for the filters
    app.get(path,
        function(rey, res) {
            Company.getPublicActiveCompanies()
                .then((companies) => {
                    // only get the first occurrence of each company id
                    // because we do a join of the company table with the posting table and each company can have
                    // multiple postings, each company can be in this list multiple times.
                    let uniqueCompanies = companies.filter(function(company, index, self) {
                        return self.findIndex(a => a.id === company.id) === index;
                    });
                    res.status(200).json(uniqueCompanies);
                })
                .catch((err) => res.status(400).json({ error: err }));
        }
    );

    // get a company by id
    app.get(path + '/:id',
        function(req, res) {
            Company.getPublicById(req.params.id)
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
};
