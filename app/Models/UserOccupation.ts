import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Occupation from './Occupation';

export default class UserOccupation extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public user_id: number;

    @column()
    public occupation_id: number;

    /** ----------------------- HasOne --------------------------- **/

    @hasOne(() => User, {localKey: 'user_id', foreignKey: 'id'})
    public user: HasOne<typeof User>;

    @hasOne(() => Occupation, {localKey: 'occupation_id', foreignKey: 'id'})
    public occupation: HasOne<typeof Occupation>;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;
}
