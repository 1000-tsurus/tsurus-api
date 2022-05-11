import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Occupation from './Occupation';

export default class UserOccupation extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    /** ----------------------- HasOne --------------------------- **/

    @hasOne(() => User, {localKey: 'user_id', foreignKey: 'id'})
    public user: HasOne<typeof User>;

    @hasOne(() => User, {localKey: 'liked_user_id', foreignKey: 'id'})
    public user: HasOne<typeof User>;

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime;
    
    @column.dateTime({ serializeAs: null })
    public deleted_at?: DateTime;

}
