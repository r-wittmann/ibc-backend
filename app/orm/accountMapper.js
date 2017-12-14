module.exports = {
    createAccount(account) {
        return knex('t_account')
            .insert(account);
    },

    getAllAccountsForAdmin() {
        return knex('t_account')
            .join('t_company', {'t_account.id': 't_company.account_id'})
            .select(
                't_account.id',
                't_company.company_name',
                't_account.name',
                't_account.email',
                't_company.website',
                't_account.company_type',
                't_account.status'
            );
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
