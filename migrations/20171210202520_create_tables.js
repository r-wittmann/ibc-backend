// knex migration
// creates all tables with primary and foreign keys to connect the tables

exports.up = function(knex) {
    return knex.schema
        .createTableIfNotExists('t_account', function(table) {
            table.increments('id').primary();
        })
        .createTableIfNotExists('t_company', function(table) {
            table.increments('id').primary();
            table.integer('account_id').unsigned().references('id').inTable('t_account').notNull().onDelete('cascade');
        })
        .createTable('t_recruiter', function(table) {
            table.increments('id').primary();
            table.integer('account_id').unsigned().references('id').inTable('t_account').notNull().onDelete('cascade');
        })
        .createTable('t_posting', function(table) {
            table.increments('id').primary();
            table.integer('account_id').unsigned().references('id').inTable('t_account').notNull().onDelete('cascade');
            table.integer('company_id').unsigned().references('id').inTable('t_company').notNull().onDelete('cascade');
            table.integer('recruiter_id').unsigned().references('id').inTable('t_recruiter').notNull().onDelete('cascade');
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('t_posting')
        .dropTableIfExists('t_recruiter')
        .dropTableIfExists('t_company')
        .dropTableIfExists('t_account');
};
