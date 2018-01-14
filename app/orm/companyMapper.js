// Object Relational Mapper for the company table
// implements all CRUD endpoints and additional helper methods

module.exports = {
    createCompany(company) {
        return knex('t_company')
            .insert(company);
    },

    // used for the filter dropdown in the public list of postings
    getPublicActiveCompanies() {
        return knex('t_company')
            .leftJoin('t_posting', 't_company.id', 't_posting.company_id')
            .where('t_posting.status', '=', knex.raw('?', ['active']))
            .select(
                't_company.id',
                't_company.company_name'
            )
    },

    getPublicById(id) {
        return knex('t_company')
            .where({ id });
    },

    getByIdAndAccountId(id, account_id) {
        return knex('t_company')
            .where({ id, account_id });
    },

    // this method does a left join of t_company with t_posting on the company id
    // to display the number of posts in the frontend.
    getByAccountIdWithSelect(account_id) {
        return knex('t_company')
            .leftJoin('t_posting', 't_company.id', 't_posting.company_id')
            .where({ 't_company.account_id': account_id })
            .select(
                't_company.id',
                't_company.company_name'
            )
            .groupBy('t_company.id')
            .count('t_company.id as totalCount')
            .sum(knex.raw('?? = ?', ['t_posting.status', 'active']));
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
