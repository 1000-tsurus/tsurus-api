import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Phone extends BaseSchema
{
    protected tableName = 'phones';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id');

            table.string('phone_number').notNullable();
            table.string('ddd', 3).notNullable();
            table.string('country_code').notNullable();
            table.boolean('is_wpp').notNullable();
            table.boolean('is_public').notNullable();

            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
