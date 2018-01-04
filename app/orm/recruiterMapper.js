module.exports = {
    createRecruiter(recruiter) {
        return knex('t_recruiter')
            .insert(recruiter);
    },

    getByIdAndAccountId(id, account_id) {
        return knex('t_recruiter')
            .where({ id, account_id });
    },

    getByAccountIdWithSelect(account_id) {
        return knex('t_recruiter')
            .leftJoin('t_posting', function() {
                this.on('t_recruiter.id', '=', 't_posting.recruiter_id')
                    .andOn('t_posting.status', '=', knex.raw('?', ['active']))
            })
            .where({ 't_recruiter.account_id': account_id })
            .select(
                't_recruiter.id',
                't_recruiter.recruiter_name'
            )
            .groupBy('t_recruiter.id', 't_posting.status')
            .count('t_posting.status as count');
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
