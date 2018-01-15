// Object Relational Mapper for the account table
// implements all CRUD endpoints and additional helper methods

module.exports = {
    createAccount(account) {
        return knex('t_account')
            .insert(account);
    },

    getAllAccountsForAdmin() {
        return knex('t_account')
            .leftJoin('t_company', 't_account.id', 't_company.account_id')
            .select(
                't_account.id',
                't_account.name',
                't_account.contact_name',
                't_account.email',
                't_account.contact_phone',
                't_company.website',
                't_account.company_type',
                't_account.status'
            );
    },

    getById(id) {
        return knex('t_account')
            .where({ id })
    },

    getByIdWithSelect(id) {
        return knex('t_account')
            .where({ id })
            .select(
                'name',
                'contact_name',
                'email',
                'contact_phone',
                'company_type'
            );
    },

    getByNameOrMail(name) {
        if (name instanceof Array) {
            return knex('t_account')
                .whereIn('name', name)
                .orWhereIn('email', name)
                .orderBy('id', 'desc');
        }
        return knex('t_account')
            .where({ name })
            .orWhere({ email: name });
    },

    updateAccount(id, updateObject) {
        return knex('t_account')
            .where({ id })
            .update(updateObject)
            .update('updated_at', knex.fn.now());
    },

    deleteAccount(id) {
        return knex('t_account')
            .where({ id })
            .del()
    }
};
