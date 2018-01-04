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
            .leftJoin('t_posting', 't_company.id', 't_posting.company_id')
            .where({ 't_company.account_id': account_id })
            .select(
                't_company.id',
                't_company.company_name',
                't_posting.status'
            )
            .groupBy('t_company.id', 't_posting.status')
            .count('t_posting.status as count');
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
