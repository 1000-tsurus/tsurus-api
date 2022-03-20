import { DateTime } from 'luxon';
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm';

export default class Occupation extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public occupation_name: string;

    @column.dateTime()
    public occupation_date_time: DateTime;

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime;

    @column.dateTime({ autoCreate: true })
    public deleted_at: DateTime;
}
