// Object Relational Mapper for the posting table
// implements all CRUD endpoints and additional helper methods

module.exports = {
    createPosting(posting) {
        return knex('t_posting')
            .insert(posting);
    },

    // used to display the public list of postings
    getPublicActivePostings() {
        return knex('t_posting')
            .leftJoin('t_company', 't_posting.company_id', 't_company.id')
            .where('status', '=', knex.raw('?', ['active']))
            .select(
                't_posting.id',
                't_posting.company_id',
                't_posting.recruiter_id',
                't_posting.title',
                't_posting.expiry_date',
                't_posting.place_of_employment',
                't_posting.contract_type',
                't_posting.field_of_employment',
                't_posting.entry_level',
                't_posting.start_of_employment',
                't_posting.created_at',
                't_company.company_name',
                't_company.logo'
            ).orderBy('t_posting.created_at', 'desc');
    },

    // used to display the public posting including all information needed from company and recruiter
    getPublicById(id) {
        return knex('t_posting')
            .leftJoin('t_company', 't_posting.company_id', 't_company.id')
            .leftJoin('t_recruiter', 't_posting.recruiter_id', 't_recruiter.id')
            .where({ 't_posting.id': id })
            .select(
                't_posting.company_id',
                't_posting.title',
                't_posting.start_of_employment',
                't_posting.contract_type',
                't_posting.contract_duration',
                't_posting.working_hours',
                't_posting.entry_level',
                't_posting.place_of_employment',
                't_posting.application_link',
                't_posting.field_of_employment',
                't_posting.pdf',
                't_posting.description',
                't_posting.expiry_date',
                't_company.logo',
                't_company.company_name',
                't_company.munich_address',
                't_company.field_of_activity',
                't_recruiter.recruiter_name',
                't_recruiter.recruiter_email',
                't_recruiter.photo',
                't_recruiter.position',
                't_recruiter.location',
                't_recruiter.phone',
                't_recruiter.mobile',
                't_recruiter.xing',
                't_recruiter.linked_in'
            );
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
            )
            .orderBy('t_posting.status', 'asc')
            .orderBy('t_posting.expiry_date', 'asc');
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
    },

    getAllForExpiredPostingsCheck() {
        return knex('t_posting')
            .leftJoin('t_recruiter', 't_posting.recruiter_id', 't_recruiter.id')
            .where('status', '=', knex.raw('?', ['active']))
            .select(
                't_posting.id',
                't_posting.account_id',
                't_posting.status',
                't_posting.expiry_date',
                't_posting.title',
                't_recruiter.recruiter_email',
                't_recruiter.recruiter_name'
            )
    }
};
