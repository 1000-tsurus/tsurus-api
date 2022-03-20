import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class Occupation extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public occupation_name: string;

    @column.dateTime()
    public occupation_date_time: DateTime;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;
}
