// public route to retrieve a list of job postings or a single one by id
// route: .../public/postings

const Posting = include('app/orm/postingMapper');
const defaultPosting = include('app/models/defaultPosting');

module.exports = function(app, path) {

    // get a list of postings
    app.get(path,
        function(req, res) {
            let filters = req.query;
            Posting.getPublicActivePostings()
                .then((postings) => {
                    // iterate over query parameters, check, if they are valid parameters for filtering and than
                    // filter for them on the postings array
                    for (let key in filters) {
                        if (filters.hasOwnProperty(key) && defaultPosting.hasOwnProperty(key)) {
                            // with a request url of .../postings?company_id=1&company_id=2 the respective query
                            // parameter is an array of strings, which will not correctly compare to the int of
                            // the company_id in the postings object. Therefor we must parse them to int. As a
                            // query for one company_id corresponds to a query parameter of type string we need
                            // to check that also in the if clause.
                            // The same issue arises from querying for specific recruiter_ids
                            if ((key === 'company_id' && filters[key] instanceof Array) ||
                                key === 'recruiter_id' && filters[key] instanceof Array) {
                                filters[key] = filters[key].map(e => parseInt(e));
                            }
                            postings = postings.filter(posting => filters[key].includes(posting[key]));
                        }
                    }
                    postings.map(posting => posting.logo = posting.logo ? posting.logo.toString() : null);
                    res.status(200).json(postings);
                })
                .catch((err) => res.status(400).json({ error: err }));
        }
    );

    // get one posting by id
    app.get(path + '/:id',
        function(req, res) {
            Posting.getPublicById(req.params.id)
                .then(([posting]) => {
                    if (!posting) {
                        res.status(404).json({ error: 'posting not found' })
                    } else {
                        if (posting.photo) {
                            posting.photo = posting.photo.toString();
                        }
                        if (posting.logo) {
                            posting.logo = posting.logo.toString();
                        }
                        res.status(200).json(posting);
                    }
                })
                .catch((err) => res.status(400).json({ error: err }));
        }
    );
};

