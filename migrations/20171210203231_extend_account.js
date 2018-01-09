// knex migration
// adds all needed columns to the account table

exports.up = function(knex) {
    return knex.schema.table('t_account', function(table) {
        table.string('name').notNullable().unique();
        table.string('password').notNullable();
        table.string('salt').notNullable();
        table.string('mother_company');
        table.string('email').notNullable();
        table.string('company_type');
        table.string('status').notNullable();
        table.boolean('admin').notNullable();
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.table('t_account', function(table) {
        table.dropUnique('name');
        table.dropColumn('password');
        table.dropColumn('salt');
        table.dropColumn('mother_company');
        table.dropColumn('email');
        table.dropColumn('company_type');
        table.dropColumn('status');
        table.dropColumn('admin');
        table.dropTimestamps();
    });
};
