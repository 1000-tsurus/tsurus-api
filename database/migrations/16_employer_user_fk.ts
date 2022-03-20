import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UserEmployer extends BaseSchema
{
    protected tableName = 'user_employer';

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
                .integer('employer_id')
                .unique()
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('employer')
                .onDelete('CASCADE');
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
