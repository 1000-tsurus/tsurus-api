import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class To_help extends BaseSchema
{
    protected tableName = 'to_help';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();

            table.string('to_help_text').nullable();
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
