module.exports = {
    createAccount(account) {
        return knex('t_account').insert(account);
    },

    getAllAccounts() {
        return knex('t_account').select();
    },

    getById(id) {
        return knex('t_account').where({ id })
    },

    getByName(name) {
        return knex('t_account').where({ name });
    },

    updateAccount(name, newAccount) {
        return knex('t_account').where({ name })
            .update(newAccount);
    }
};
