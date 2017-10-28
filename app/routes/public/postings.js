// public route to retrieve a list of job postings or a single one by id
var Posting = include('app/models/posting');

module.exports = function(app, path) {

    app.get(path, function(req, res) {
        Posting.find({}, function(err, postings) {
            if (err) throw err;
            res.json(postings);
        })
    });

    app.get(path + '/:id', function(req, res) {
        Posting.findById(req.params.id, function(err, posting) {
            if (err) throw err;
            if (!posting) {
                res.json({ success: false, message: 'User not found' });
            } else {
                res.json(posting);
            }
        });
    });
};

