import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Employer extends BaseSchema
{
    protected tableName = 'employer';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();

            table
                .integer('user_id')
                .unique()
                .notNullable();
            // .unsigned()
            // .references('id')
            // .inTable('users')
            // .onDelete('CASCADE');

            table.string('role').nullable();

            table.string('employer').nullable();

            table.dateTime('entry_date_time');

            table.dateTime('deleted_at').nullable().defaultTo(null);
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
