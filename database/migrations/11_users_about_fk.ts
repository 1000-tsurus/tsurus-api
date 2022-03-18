import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UsersSchema extends BaseSchema
{
    protected tableName = 'users';

    public async up ()
    {
        this.schema.alterTable(this.tableName, (table) =>
        {
            table
                .integer('about_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('abouts')
                .onDelete('CASCADE')
                .alter();
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
