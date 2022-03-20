import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UserTo_help extends BaseSchema
{
    protected tableName = 'user_to_help';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();

            table
                .integer('user_id')
                .unique()
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE');

            table
                .integer('to_help_id')
                .unique()
                .notNullable()
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
