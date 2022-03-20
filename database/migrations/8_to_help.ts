import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class To_help extends BaseSchema
{
    protected tableName = 'to_helps';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();

            table.string('to_help_text').nullable();

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
