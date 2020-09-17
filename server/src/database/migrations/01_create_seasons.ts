import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('seasons', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('series_id').notNullable();
        
        table.foreign('series_id').references('id').inTable('series');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('seasons');
}