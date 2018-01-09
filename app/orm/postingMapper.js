// Object Relational Mapper for the posting table
// implements all CRUD endpoints and additional helper methods

module.exports = {
    createPosting(posting) {
        return knex('t_posting')
            .insert(posting);
    },

    getByIdAndAccountId(id, account_id) {
        return knex('t_posting')
            .where({ id, account_id });
    },

    // join of postings with the respective company and recruiter
    getByAccountIdWithSelect(account_id) {
        return knex('t_posting')
            .leftJoin('t_company', 't_posting.company_id', 't_company.id')
            .leftJoin('t_recruiter', 't_posting.recruiter_id', 't_recruiter.id')
            .where({ 't_posting.account_id': account_id })
            .select(
                't_posting.id',
                't_posting.company_id',
                't_posting.recruiter_id',
                't_posting.title',
                't_posting.status',
                't_posting.expiry_date',
                't_posting.contract_type',
                't_posting.entry_level',
                't_company.company_name',
                't_recruiter.recruiter_name'
            ).orderBy('t_posting.created_at', 'desc');
    },

    updatePosting(id, account_id, updateObject) {
        return knex('t_posting')
            .where({ id, account_id })
            .update(updateObject)
            .update('updated_at', knex.fn.now());
    },

    deletePosting(id, account_id) {
        return knex('t_posting')
            .where({ id, account_id })
            .del();
    }
};
