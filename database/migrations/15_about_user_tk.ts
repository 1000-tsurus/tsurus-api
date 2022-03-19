import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class About extends BaseSchema
{
    protected tableName = 'about';

    public async up ()
    {
        this.schema.alterTable(this.tableName, (table) =>
        {
            table
                .integer('user_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')

            table
                .integer('occupation_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('occupation')
                .onDelete('CASCADE')

            table
                .integer('trajectory_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('trajectory')
                .onDelete('CASCADE')

            table
                .integer('to_help_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('to_help')
                .onDelete('CASCADE')

            table
                .integer('employer_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('skill_categories')
                .onDelete('CASCADE')

            table
                .integer('skill_category_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('skill_categories')
                .onDelete('CASCADE')
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
