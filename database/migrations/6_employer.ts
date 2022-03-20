import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Employer extends BaseSchema
{
    protected tableName = 'employers';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();

            table.string('role').nullable();

            table.string('employer').nullable();

            table.dateTime('entry_date_time');

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
