import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class Trajectory extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public trajectory_text: string;

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime;
}
