import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Phone from './Phone';

export default class UserPhone extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public user_id: number;

    @column()
    public phone_id: number;

    /** ----------------------- HasOne --------------------------- **/

    @hasOne(() => User, {localKey: 'user_id', foreignKey: 'id'})
    public user: HasOne<typeof User>;

    @hasOne(() => Phone, {localKey: 'phone_id', foreignKey: 'id'})
    public phone: HasOne<typeof Phone>;
}
