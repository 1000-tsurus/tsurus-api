import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Skill_category extends BaseSchema
{
    protected tableName = 'skill_categories';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();

            table.string('name').nullable();

            table.dateTime('deleted_at').nullable().defaultTo(null);
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
