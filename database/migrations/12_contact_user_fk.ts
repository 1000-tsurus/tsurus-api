import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UserContact extends BaseSchema
{
    protected tableName = 'user_contact';

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
                .integer('contact_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('contact')
                .onDelete('CASCADE');
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
