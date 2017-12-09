exports.up = function(knex) {
    return knex.schema.createTable('t_account', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable().unique();
        table.string('password').notNullable();
        table.string('salt').notNullable();
        table.string('mother_company');
        table.string('website');
        table.string('person_of_contact').notNullable();
        table.string('email').notNullable();
        table.string('company_type');
        table.boolean('reg_accepted').notNullable().defaultTo(false);
        table.boolean('admin').notNullable().defaultsTo(false);
        table.timestamps(false, true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('t_account')
};
