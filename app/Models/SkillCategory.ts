import { DateTime } from 'luxon';
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm';

export default class SkillCategory extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public skill_name: string;

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime;

    @column.dateTime({ autoCreate: true })
    public updated_at: DateTime;

    @column.dateTime({ serializeAs: null })
    public deleted_at: DateTime;
}
