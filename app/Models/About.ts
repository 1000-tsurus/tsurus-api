import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import Occupation from './Occupation';
import Trajectory from './Trajectory';
import ToHelp from './ToHelp';
import Employer from './Employer';
import SkillCategory from './SkillCategory';
import User from './User';

export default class About extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public about: string;

    /** ----------------------- HasOne --------------------------- **/

    @hasOne(() => User, {localKey: 'user_id', foreignKey: 'id'})
    public user_id: HasOne<typeof User>;

    @hasOne(() => Occupation, {localKey: 'occupation_id', foreignKey: 'id'})
    public occupation_id: HasOne<typeof Occupation>;

    @hasOne(() => Trajectory, {localKey: 'trajectory_id', foreignKey: 'id'})
    public trajectory_id: HasOne<typeof Trajectory>;

    @hasOne(() => ToHelp, {localKey: 'to_help_id', foreignKey: 'id'})
    public to_help_id: HasOne<typeof ToHelp>;

    @hasOne(() => Employer, {localKey: 'employer_id', foreignKey: 'id'})
    public employer_id: HasOne<typeof Employer>;

    @hasOne(() => SkillCategory, {localKey: 'skill_category_id', foreignKey: 'id'})
    public skill_category_id: HasOne<typeof SkillCategory>;

    /** ---------------------------------------------------------- **/

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;
}
