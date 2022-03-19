import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class About extends BaseSchema
{
    protected tableName = 'about';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();

            table.string('about', 225).notNullable();

            /**
             * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true }).notNullable();
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
