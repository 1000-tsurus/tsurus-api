import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Employer from './Employer';

export default class UserEmployer extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public user_id: number;

    @column()
    public employer_id: number;

    /** ----------------------- HasOne --------------------------- **/

    @hasOne(() => User, {localKey: 'user_id', foreignKey: 'id'})
    public user: HasOne<typeof User>;

    @hasOne(() => Employer, {localKey: 'employer_id', foreignKey: 'id'})
    public employer: HasOne<typeof Employer>;

    @column.dateTime({ autoCreate: true })
    public deletedAt: DateTime;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;
}
