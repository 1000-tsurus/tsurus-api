import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UserLikeUser extends BaseSchema
{
    protected tableName = 'user_like_user';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();

            table
                .integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE');

            table
                .integer('liked_user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE');

            table.timestamp('created_at', { useTz: true }).notNullable();
            table.dateTime('deleted_at').nullable().defaultTo(null);
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
