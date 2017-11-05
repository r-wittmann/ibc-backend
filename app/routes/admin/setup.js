// admin route to instantiate the admin user

const User = include('app/models/user.js');

module.exports = function(app, path) {

    app.get(path + '/nC3XDIqPl0t2gg5OGy5kfZM6jb6zjXQq4hkrncaiyQwbAoLI', function(req, res) {

        User.findOne({ email: 'ibc-job-portal@gmail.com' }, function(err, user) {

            if (err) res.status(500).send(err);

            if (!user) {
                // create admin user
                let admin = {
                    email: 'ibc-job-portal@gmail.com',
                    password: 'L4V%nuv@*6g_mY9#',
                    admin: true,
                    regAccepted: true
                };

                // save the admin user
                User.create(admin, function(err) {
                    if (err) res.status(500).send(err);
                    res.json({ success: true });
                });
            } else {
                res.json({ success: false, message: 'Database already instantiated' });
            }
        });
    });
};
