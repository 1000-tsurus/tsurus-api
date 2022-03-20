import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class About extends BaseSchema
{
    protected tableName = 'about';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();

            table
                .integer('occupation_id')
                .unsigned()
                .references('id')
                .inTable('occupation')
                .onDelete('CASCADE');

            table
                .integer('trajectory_id')
                .unsigned()
                .references('id')
                .inTable('trajectory')
                .onDelete('CASCADE');

            table
                .integer('to_help_id')
                .unsigned()
                .references('id')
                .inTable('to_help')
                .onDelete('CASCADE');
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
