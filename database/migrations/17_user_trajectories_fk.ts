import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UserTrajectory extends BaseSchema
{
    protected tableName = 'user_trajectory';

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
                .integer('trajectory_id')
                .unique()
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('trajectory')
                .onDelete('CASCADE');
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
