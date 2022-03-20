import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class SkillCategory extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public skill_name: string;

    @column.dateTime({ autoCreate: true })
    public deleted_at: DateTime;
}
