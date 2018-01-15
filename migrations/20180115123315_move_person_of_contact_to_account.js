// knex migration
// moves the person of contact from the company to the account

exports.up = function(knex) {
    return knex.schema.table('t_account', function(table) {
        table.string('contact_name');
        table.string('contact_phone');
    }).then(() => {
        return knex.schema.table('t_company', function(table) {
            table.dropColumns('contact_name', 'contact_email', 'contact_phone');
        })
    });
};

exports.down = function(knex) {
    return knex.schema.table('t_company', function(table) {
        table.string('contact_name');
        table.string('contact_email');
        table.string('contact_phone');
    }).then(() => {
        return knex.schema.table('t_account', function(table) {
            table.dropColumns('contact_name', 'contact_phone');
        })
    });
};
