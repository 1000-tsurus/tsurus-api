import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UserContact extends BaseSchema
{
    protected tableName = 'user_contacts';

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
                .inTable('contacts')
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
