import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Trajectory extends BaseSchema
{
    protected tableName = 'trajectories';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();

            table.string('trajectory_text').nullable();

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
