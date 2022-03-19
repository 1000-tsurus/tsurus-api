import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Contact extends BaseSchema
{
    protected tableName = 'contact';

    public async up ()
    {
        this.schema.alterTable(this.tableName, (table) =>
        {
            table
                .integer('user_id')
                .unique()
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')

            table
                .integer('phone_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('phone')
                .onDelete('CASCADE')
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
