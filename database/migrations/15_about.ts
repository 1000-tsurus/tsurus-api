import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class About extends BaseSchema
{
    protected tableName = 'abouts';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();

            table
                .integer('occupation_id')
                .unsigned()
                .references('id')
                .inTable('occupations')
                .onDelete('CASCADE');

            table
                .integer('trajectory_id')
                .unsigned()
                .references('id')
                .inTable('trajectories')
                .onDelete('CASCADE');

            table
                .integer('to_help_id')
                .unsigned()
                .references('id')
                .inTable('to_helps')
                .onDelete('CASCADE');

            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).defaultTo(null);
            table.dateTime('deleted_at').nullable().defaultTo(null);
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
