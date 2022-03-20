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
    public occupation_id: number;

    @column()
    public trajectory_id: number;

    @column()
    public to_help_id: number;

    @column()
    public employer_id: number;

    @column()
    public skill_category_id: number;

    /** ----------------------- HasOne --------------------------- **/

    @hasOne(() => Occupation, {localKey: 'occupation_id', foreignKey: 'id'})
    public occupation: HasOne<typeof Occupation>;

    @hasOne(() => Trajectory, {localKey: 'trajectory_id', foreignKey: 'id'})
    public trajectory: HasOne<typeof Trajectory>;

    @hasOne(() => ToHelp, {localKey: 'to_help_id', foreignKey: 'id'})
    public to_help: HasOne<typeof ToHelp>;

    @hasOne(() => Employer, {localKey: 'employer_id', foreignKey: 'id'})
    public employer: HasOne<typeof Employer>;

    @hasOne(() => SkillCategory, {localKey: 'skill_category_id', foreignKey: 'id'})
    public skill_category: HasOne<typeof SkillCategory>;
}
