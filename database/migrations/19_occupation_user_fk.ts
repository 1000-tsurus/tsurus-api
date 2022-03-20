import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UserOccupation extends BaseSchema
{
    protected tableName = 'user_occupation';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table
                .integer('user_id')
                .unique()
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE');

            table
                .integer('occupation_id')
                .unique()
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('occupation')
                .onDelete('CASCADE');
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
