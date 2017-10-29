// public route to retrieve company details

const Company = include('app/models/company');
const Posting = include('app/models/postings');

module.exports = function(app, path) {

    // get a list of companies
    app.get(path, function(req, res) {
        Company.find({}, function(err, companies) {
            if (err) res.status(500).send(err);
            res.json(companies);
        })
    });

    // get a company by id
    app.get(path + '/:id', function(req, res) {
        Company.findById(req.params.id, function(err, company) {
            if (err) res.status(500).send(err);
            if (!company) {
                res.json({ success: false, message: 'Company not found' });
            } else {
                res.json(company);
            }
        });
    });

    // get a list of postings of one company
    app.get(path + '/:id/postings', function(req, res) {
        Company.findById(req.params.id, function(err, company) {
            if (err) res.status(500).send(err);
            if (!company) {
                res.json({ success: false, message: 'Company not found' });
            } else {
                let postingList = [];
                for (let postingId of company.postings) {
                    postingList.push(Posting.findById(postingId));
                }
                res.json(postingList);
            }
        });
    });
};
