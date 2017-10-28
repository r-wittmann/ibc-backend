var User = include('app/models/user.js');

module.exports = function(app, path) {

    app.get(path + '/nC3XDIqPl0t2gg5OGy5kfZM6jb6zjXQq4hkrncaiyQwbAoLI', function(req, res) {

        User.findOne({ name: 'admin' }, function(err, user) {
            if (err) throw err;

            if (!user) {
                // create admin user
                var admin = new User({
                    name: 'admin',
                    password: 'L4V%nuv@*6g_mY9#',
                    admin: true,
                    regAccepted: true
                });

                // save the admin user
                admin.save(function(err) {
                    if (err) throw err;
                    res.json({ success: true });
                });
            } else {
                res.json({ success: false, message: 'Database already instantiated' });
            }
        });
    });
};
