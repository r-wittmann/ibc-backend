// public route to retrieve a list of job postings or a single one by id

const Posting = include('app/models/posting');

module.exports = function(app, path) {

    // get a list of postings
    app.get(path, function(req, res) {
        Posting.find({}, function(err, postings) {
            if (err) res.status(500).send(err);
            res.json(postings);
        })
    });

    // get a posting by id
    app.get(path + '/:id', function(req, res) {
        Posting.findById(req.params.id, function(err, posting) {
            if (err) res.status(500).send(err);
            if (!posting) {
                res.json({ success: false, message: 'User not found' });
            } else {
                res.json(posting);
            }
        });
    });
};

