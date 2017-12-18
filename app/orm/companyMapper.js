module.exports = {
    createCompany(company) {
        return knex('t_company')
            .insert(company);
    },

    getById(id) {
        return knex('t_company')
            .where({ id })
    },

    // getByIdWithSelect(id) {
    //     return knex('t_account')
    //         .where({ id })
    //         .select(
    //             'name',
    //             'email',
    //             'mother_company',
    //             'company_type'
    //         );
    // },

    // getByName(name) {
    //     return knex('t_account')
    //         .where({ name });
    // },

    updateCompany(id, updateObject) {
        return knex('t_company')
            .where({ id })
            .update(updateObject);
    },

    deleteCompany(id) {
        return knex('t_company')
            .where({ id })
            .del()
    }
};
