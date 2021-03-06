// knex migration
// adds all needed columns to the recruiter table

exports.up = function(knex) {
    return knex.schema.table('t_recruiter', function(table) {
        table.string('recruiter_name').notNullable();
        table.string('recruiter_email').notNullable();
        table.string('phone');
        table.string('mobile');
        table.string('position').notNullable();
        table.string('location');
        table.specificType('photo', 'mediumblob').defaultTo(null);
        table.string('xing');
        table.string('linked_in');
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.table('t_recruiter', function(table) {
        table.dropColumn('recruiter_name');
        table.dropColumn('recruiter_email');
        table.dropColumn('phone');
        table.dropColumn('mobile');
        table.dropColumn('position');
        table.dropColumn('location');
        table.dropColumn('photo');
        table.dropColumn('xing');
        table.dropColumn('linked_in');
        table.dropTimestamps();
    });
};
