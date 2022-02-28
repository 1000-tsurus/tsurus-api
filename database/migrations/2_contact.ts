import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Contact extends BaseSchema
{
    protected tableName = 'contact';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id');

            table
                .integer('user_id')
                .unique();
            // .notNullable()
            // .unsigned()
            // .references('id')
            // .inTable('users')
            // .onDelete('CASCADE');

            table
                .integer('phone_id')
                .notNullable();
            // .unsigned()
            // .references('id')
            // .inTable('phone')
            // .onDelete('CASCADE');

            table.string('contact_email').nullable();
            table.string('linkedin_url').nullable();
            table.string('instagram_url').nullable();
            table.string('personal_url').nullable();
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
