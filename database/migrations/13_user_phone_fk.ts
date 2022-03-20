import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class PhoneUser extends BaseSchema
{
    protected tableName = 'phone_user';

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
                .integer('phone_id')
                .unique()
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('phone')
                .onDelete('CASCADE');
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
