// admin route to instantiate the admin user

const User = include('app/models/user.js');

module.exports = function(app, path) {

    app.get(path + '/nC3XDIqPl0t2gg5OGy5kfZM6jb6zjXQq4hkrncaiyQwbAoLI', function(req, res) {

        User.findOne({ name: 'admin' }, function(err, user) {

            if (err) res.status(500).send(err);

            if (!user) {
                // create admin user
                let admin = new User({
                    name: 'admin',
                    password: 'L4V%nuv@*6g_mY9#',
                    admin: true,
                    regAccepted: true
                });

                // save the admin user
                admin.save(function(err) {
                    if (err) res.status(500).send(err);
                    res.json({ success: true });
                });
            } else {
                res.json({ success: false, message: 'Database already instantiated' });
            }
        });
    });
};
