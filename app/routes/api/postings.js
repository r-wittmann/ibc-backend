// private route to retrieve a list of job postings or a single one by id

const Posting = include('app/models/posting');
const validateToken = include('app/routes/api/validateToken');

module.exports = function(app, path) {

    // create a job posting
    app.post(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {

            let posting = Object.assign({}, { owner: req.decodedToken.id }, req.body);

            Posting.create(posting, function(err, posting) {
                if (err) res.status(500).send(err);
                res.send({ success: true, id: posting._id });
            });
        }
    );

    // get a list of job postings (only id, company, recruiter, title and subtitle)
    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Posting.find({}, function(err, postings) {
                if (err) res.status(500).send(err);
                // just respond with postings where the id from the token correspond with the postings owner
                postings = postings.filter(posting => posting.owner === req.decodedToken.id);

                // if there are query parameters, iterate over them,
                // check if they are actually fields of postings and than filter for the provided value
                for (let key in req.query) {
                    if (req.query.hasOwnProperty(key) && key in postings[0]) {
                        console.log(key, ':', req.query[key]);
                        postings = postings.filter(posting => posting[key] === req.query[key]);
                    }
                }
                // reduce posting to the essential information to save bandwidth
                postings = postings.map(posting => ({
                    _id: posting._id,
                    company: posting.company,
                    recruiter: posting.recruiter,
                    title: posting.title,
                }));
                res.json(postings);
            })
        });

    // get a job posting by id
    app.get(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Posting.findById(req.params.id, function(err, posting) {

                if (err) res.status(500).send(err);

                if (!posting || posting.owner !== req.decodedToken.id) {
                    res.json({ success: false, message: 'User not found' });
                } else {
                    res.json(posting);
                }
            });
        });

    // update a job posting
    app.put(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Posting.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, posting) {
                if (err) res.status(500).send(err);

                if (!posting || posting.owner !== req.decodedToken.id) {
                    res.json({ success: false, message: 'Posting not found' });
                } else {
                    res.json({ success: true, posting });
                }
            });
        }
    );

    // delete a posting
    app.delete(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Posting.findByIdAndRemove(req.params.id, function(err, posting) {

                if (err) res.status(500).send(err);

                if (!posting || posting.owner !== req.decodedToken.id) {
                    res.json({ success: false, message: 'Posting not found' });
                } else {
                    res.json({ success: true });
                }
            });
        }
    );
};

