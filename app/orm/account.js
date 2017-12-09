module.exports = {
    createAccount(account) {
        return knex('t_account').insert(account);
    },

    getByName(name) {
        return knex('t_account').where({ name })
    }
};
