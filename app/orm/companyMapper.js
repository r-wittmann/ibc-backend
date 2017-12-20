module.exports = {
    createCompany(company) {
        return knex('t_company')
            .insert(company);
    },

    getByIdAndAccountId(id, account_id) {
        return knex('t_company')
            .where({ id, account_id });
    },

    getByAccountIdWithSelect(account_id) {
        return knex('t_company')
            .where({ account_id })
            .select(
                'id',
                'company_name'
            );
    },

    updateCompany(id, account_id, updateObject) {
        return knex('t_company')
            .where({ id, account_id })
            .update(updateObject)
            .update('updated_at', knex.fn.now());
    },

    deleteCompany(id, account_id) {
        return knex('t_company')
            .where({ id, account_id })
            .del();
    }
};
