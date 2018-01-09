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
    // to display the number of active posts in the frontend. Therefore we additionally filter
    // for the posting status to be active and do a count afterwards
    getByAccountIdWithSelect(account_id) {
        return knex('t_company')
            .leftJoin('t_posting', function() {
                this.on('t_company.id', '=', 't_posting.company_id')
                    .andOn('t_posting.status', '=', knex.raw('?', ['active']))
            })
            .where({ 't_company.account_id': account_id })
            .select(
                't_company.id',
                't_company.company_name'
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
