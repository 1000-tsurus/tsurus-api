import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UserSkill_category extends BaseSchema
{
    protected tableName = 'user_skill_categories';

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
                .integer('skill_category_id')
                .unsigned()
                .references('id')
                .inTable('skill_categories')
                .onDelete('CASCADE');
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
