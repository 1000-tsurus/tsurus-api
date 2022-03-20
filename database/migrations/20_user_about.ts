import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UsersAbout extends BaseSchema
{
    protected tableName = 'user_abouts';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();

            table
                .integer('about_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('abouts')
                .onDelete('CASCADE');

            table
                .integer('user_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE');

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
