import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Occupation extends BaseSchema
{
    protected tableName = 'occupations';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();

            table.string('occupation_name').nullable();

            table.dateTime('occupation_date_time');

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
