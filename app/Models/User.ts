import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { column, beforeSave, BaseModel, hasOne, HasOne, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import About from './About';
import Phone from './Phone';
import Contact from './Contact';
import Employer from './Employer';
import Occupation from './Occupation';
import UserPhone from './UserPhone';
import SkillCategory from './SkillCategory';
import ToHelp from './ToHelp';
import Trajectory from './Trajectory';

export default class User extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public full_name: string;

    @column({ serializeAs: null })
    public password: string;

    @column()
    public email: string;

    @column()
    public icon_url: string;

    @column()
    public type_id: number;

    @column()
    public about: string;

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updated_at: DateTime;

    @column.dateTime({ serializeAs: null })
    public deleted_at?: DateTime;

    /* -------------------- ManyToMany ------------------- */

    @manyToMany(() => About, {
        pivotTable: 'user_about',
        pivotForeignKey: 'user_id',
        pivotRelatedForeignKey: 'about_id',
    })
    public abouts: ManyToMany<typeof About>;

    @manyToMany(() => Contact, {
        pivotTable: 'user_contact',
        pivotForeignKey: 'user_id',
        pivotRelatedForeignKey: 'contact_id',
    })
    public contact: ManyToMany<typeof Contact>;

    @manyToMany(() => Employer, {
        pivotTable: 'user_employer',
        pivotForeignKey: 'user_id',
        pivotRelatedForeignKey: 'employer_id',
    })
    public employer: ManyToMany<typeof Employer>;

    @manyToMany(() => Occupation, {
        pivotTable: 'user_occupation',
        pivotForeignKey: 'user_id',
        pivotRelatedForeignKey: 'occupation_id',
    })
    public occupation: ManyToMany<typeof Occupation>;

    @manyToMany(() => Phone, {
        pivotTable: 'user_phone',
        pivotForeignKey: 'user_id',
        pivotRelatedForeignKey: 'phone_id',
    })
    public phone: ManyToMany<typeof Phone>;

    @manyToMany(() => SkillCategory, {
        pivotTable: 'user_skill_categories',
        pivotForeignKey: 'user_id',
        pivotRelatedForeignKey: 'skill_category_id',
    })
    public skill_category: ManyToMany<typeof SkillCategory>;

    @manyToMany(() => ToHelp, {
        pivotTable: 'user_to_help',
        pivotForeignKey: 'user_id',
        pivotRelatedForeignKey: 'to_help_id',
    })
    public to_help: ManyToMany<typeof ToHelp>;

    @manyToMany(() => Trajectory, {
        pivotTable: 'user_trajectory',
        pivotForeignKey: 'user_id',
        pivotRelatedForeignKey: 'trajectory_id',
    })
    public trajectory: ManyToMany<typeof Trajectory>;

    @beforeSave()
    public static async hashPassword (user: User)
    {
        if (user.$dirty.password)
        {
            user.password = await Hash.make(user.password);
        }
    }
}
