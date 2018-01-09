// knex migration
// adds all needed columns to the company table

exports.up = function(knex) {
    return knex.schema.table('t_company', function(table) {
        table.string('company_name').notNullable();
        table.string('contact_name').notNullable();
        table.string('contact_email').notNullable();
        table.string('contact_phone').notNullable();
        table.string('munich_address').notNullable();
        table.string('locations').defaultTo('');
        table.integer('employees').defaultTo(1);
        table.string('website').notNullable();
        table.string('kununu').defaultTo('');
        table.string('field_of_activity').defaultTo('');
        table.specificType('logo', 'mediumblob');
        table.mediumtext('company_description');
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.table('t_company', function(table) {
        table.dropColumn('company_name');
        table.dropColumn('contact_name');
        table.dropColumn('contact_email');
        table.dropColumn('contact_phone');
        table.dropColumn('munich_address');
        table.dropColumn('locations');
        table.dropColumn('employees');
        table.dropColumn('website');
        table.dropColumn('kununu');
        table.dropColumn('field_of_activity');
        table.dropColumn('logo');
        table.dropColumn('company_description');
        table.dropTimestamps();
    });
};
