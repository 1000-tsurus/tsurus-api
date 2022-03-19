import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Trajectory extends BaseSchema
{
    protected tableName = 'trajectory';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();

            table.string('trajectory_text').nullable();
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
