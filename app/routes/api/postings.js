// private route to retrieve a list of job postings or a single one by id
var Posting = include('app/models/posting');
var validateToken = include('app/routes/api/validateToken');

module.exports = function(app, path) {
    // endpoint for creating a posting is still missing

    app.get(path,
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Posting.find({}, function(err, postings) {
                if (err) throw err;
                res.json(postings);
            })
        });

    app.get(path + '/:id',
        function(req, res, next) {
            validateToken(req, res, next, app);
        },
        function(req, res) {
            Posting.findById(req.params.id, function(err, posting) {
                if (err) throw err;
                if (!posting) {
                    res.json({ success: false, message: 'User not found' });
                } else {
                    res.json(posting);
                }
            });
        });

    // endpoint for updating a posting is still missing
};

