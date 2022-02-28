import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class To_help extends BaseSchema
{
    protected tableName = 'to_help';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();

            table
                .integer('user_id')
                .unique()
                .notNullable();
            // .unsigned()
            // .references('id')
            // .inTable('users')
            // .onDelete('CASCADE');

            table.string('to_help_text').nullable();
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
