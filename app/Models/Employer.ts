import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class Employer extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public role: string;

    @column()
    public employer: string;

    @column.dateTime()
    public entry_date_time: DateTime;

    @column.dateTime({ autoCreate: true })
    public deletedAt: DateTime;

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime;
}
