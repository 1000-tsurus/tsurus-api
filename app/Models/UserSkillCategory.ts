import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import SkillCategory from './SkillCategory';

export default class UserSkill_category extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public user_id: number;

    @column()
    public skill_category_id: number;

    /** ----------------------- ManyToMany --------------------------- **/

    @hasMany(() => User, {localKey: 'user_id', foreignKey: 'id'})
    public user: HasMany<typeof User>;

    @hasMany(() => SkillCategory, {localKey: 'skill_category_id', foreignKey: 'id'})
    public skill_category: HasMany<typeof SkillCategory>;
}
