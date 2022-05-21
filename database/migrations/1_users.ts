import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UsersSchema extends BaseSchema
{
    protected tableName = 'users';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();
            table.string('full_name', 255).notNullable();
            table.string('password', 180).notNullable();
            table.string('email', 255).notNullable().unique();
            table.string('icon_url', 255).notNullable();
            table.integer('type_id').notNullable();
            table.string('about', 255).notNullable();

            /**
             * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
            table.dateTime('deleted_at').nullable().defaultTo(null);
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
