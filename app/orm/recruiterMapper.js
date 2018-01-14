// Object Relational Mapper for the recruiter table
// implements all CRUD endpoints and additional helper methods

module.exports = {
    createRecruiter(recruiter) {
        return knex('t_recruiter')
            .insert(recruiter);
    },

    getByIdAndAccountId(id, account_id) {
        return knex('t_recruiter')
            .where({ id, account_id });
    },

    // this method does a left join of t_company with t_posting on the company id
    // to display the number of active posts in the frontend. Therefore we additionally filter
    // for the posting status to be active and do a count afterwards
    getByAccountIdWithSelect(account_id) {
        return knex('t_recruiter')
            .leftJoin('t_posting', 't_recruiter.id', 't_posting.recruiter_id')
            .where({ 't_recruiter.account_id': account_id })
            .select(
                't_recruiter.id',
                't_recruiter.recruiter_name'
            )
            .groupBy('t_recruiter.id')
            .count('t_recruiter.id as totalCount')
            .sum(knex.raw('?? = ?', ['t_posting.status', 'active']));
    },

    updateRecruiter(id, account_id, updateObject) {
        return knex('t_recruiter')
            .where({ id, account_id })
            .update(updateObject)
            .update('updated_at', knex.fn.now());
    },

    deleteRecruiter(id, account_id) {
        return knex('t_recruiter')
            .where({ id, account_id })
            .del();
    }
};
