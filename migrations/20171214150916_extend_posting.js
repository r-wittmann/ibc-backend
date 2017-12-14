exports.up = function(knex) {
    return knex.schema.table('t_posting', function(table) {
        table.string('title').notNullable();
        table.string('start_of_employment').notNullable();
        table.string('contract_type');
        table.string('contract_duration');
        table.string('working_hours');
        table.string('entry_level');
        table.string('place_of_employment');
        table.string('application_link').notNullable();
        table.string('field_of_employment');
        table.boolean('pdf').notNullable();
        table.string('status').notNullable();
        table.string('description').notNullable();
        table.string('expiry_date').notNullable();
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.table('t_posting', function(table) {
        table.dropColumn('title');
        table.dropColumn('start_of_employment');
        table.dropColumn('contract_type');
        table.dropColumn('contract_duration');
        table.dropColumn('working_hours');
        table.dropColumn('entry_level');
        table.dropColumn('place_of_employment');
        table.dropColumn('application_link');
        table.dropColumn('field_of_employment');
        table.dropColumn('pdf');
        table.dropColumn('status');
        table.dropColumn('description');
        table.dropColumn('expiry_date');
        table.dropTimestamps();
    });
};
