module.exports = {
    client: 'mysql',
    connection: {
        host : 'localhost',
        database: 'ibc_database',
        user: 'root',
        password: 'mypassword'
    },
    seeds: {
        directory: __dirname + '/seeds'
    }
};
