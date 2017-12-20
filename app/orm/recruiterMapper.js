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
            .where({ account_id })
            .select(
                'id',
                'recruiter_name'
            );
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
