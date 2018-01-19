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
                            // if the query key is either company_id or recruiter_id (the only two values saved as an int in the database
                            if (key === 'company_id' || key === 'recruiter_id') {
                                // if the query contains more than one element, we must parse the strings to ints to allow the comparison
                                if(filters[key] instanceof Array) {
                                    filters[key] = filters[key].map(e => parseInt(e));
                                } else {
                                    // if the query contains only one element, we must parse the string and wrap it in an array for the comparison
                                    filters[key] = Array.of(parseInt(filters[key]));
                                }
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

