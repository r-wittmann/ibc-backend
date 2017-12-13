module.exports = {
    createAccount(account) {
        return knex('t_account')
            .insert(account);
    },

    getAllAccounts() {
        return knex('t_account')
            .select();
    },

    getById(id) {
        return knex('t_account')
            .where({ id })
    },

    getByName(name) {
        return knex('t_account')
            .where({ name });
    },

    updateAccount(id, updateObject) {
        return knex('t_account')
            .where({ id })
            .update(updateObject);
    },

    deleteAccount(id) {
        return knex('t_account')
            .where({ id })
            .del()
    }
};
