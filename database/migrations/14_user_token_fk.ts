import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Token extends BaseSchema
{
    protected tableName = 'token';

    public async up ()
    {
        this.schema.alterTable(this.tableName, (table) =>
        {
            table
                .integer('user_id')
                .unique()
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
