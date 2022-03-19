import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Occupation extends BaseSchema
{
    protected tableName = 'occupation';

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
