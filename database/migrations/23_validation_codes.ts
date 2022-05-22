import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ValidationCodes extends BaseSchema
{
    protected tableName = 'validation_codes';

    public async up ()
    {
        this.schema.createTable(this.tableName, (table) =>
        {
            table.increments('id').primary();

            table.string('code', 4).notNullable();
            table.dateTime('expiration_date_time').notNullable();
            table.boolean('is_used').notNullable().defaultTo(false);

            table
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }

    public async down ()
    {
        this.schema.dropTable(this.tableName);
    }
}
