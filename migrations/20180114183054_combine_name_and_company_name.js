// knex migration
// combines name and company_name in the account table

exports.up = function(knex) {
    return knex.schema.table('t_account', function(table) {
        table.dropColumn('mother_company')
    });
};

exports.down = function(knex) {
    return knex.schema.table('t_account', function(table) {
        table.string('mother_company');
    });
};
