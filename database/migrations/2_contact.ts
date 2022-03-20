import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Contact extends BaseSchema
{
    protected tableName = 'contacts';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id');

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
