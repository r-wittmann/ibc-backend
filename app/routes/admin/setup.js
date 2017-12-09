// admin route to instantiate the admin user

const crypto = require('crypto');
const Account = include('app/orm/account');

module.exports = function(app, path) {

    app.get(path + '/nC3XDIqPl0t2gg5OGy5kfZM6jb6zjXQq4hkrncaiyQwbAoLI', function(req, res) {

        let salt = crypto.randomBytes(4).toString('hex');
        let password = crypto.createHmac('sha512', salt).update('L4V%nuv@*6g_mY9#').digest('hex');

        let account = {
            name: 'admin',
            salt: salt,
            password: password,
            person_of_contact: 'admin',
            email: 'ibc-job-portal@gmail.com',
            reg_accepted: true,
            admin: true
        };

        Account.createAccount(account)
            .then(() => res.status(201).send('database initialized'))
            .catch((err) => res.status(403).send('database already initialized'));
    });
};
