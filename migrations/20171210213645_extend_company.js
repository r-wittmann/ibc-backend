exports.up = function(knex) {
    return knex.schema.table('t_company', function(table) {
        table.string('company_name').notNullable();
        table.string('contact_name').notNullable();
        table.string('contact_email').notNullable();
        table.string('contact_phone').notNullable();
        table.string('munich_address').notNullable();
        table.string('locations');
        table.integer('employees');
        table.string('website').notNullable();
        table.string('kununu');
        table.string('field_of_activity');
        table.specificType('logo', 'mediumblob').defaultTo(null);
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
