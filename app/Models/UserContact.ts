import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Contact from './Contact';

export default class UserContact extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @hasOne(() => User, {localKey: 'user_id', foreignKey: 'id'})
    public user_id: HasOne<typeof User>;

    @hasOne(() => Contact, {localKey: 'contact_id', foreignKey: 'id'})
    public contact_id: HasOne<typeof Contact>;

    /** ----------------------- HasOne --------------------------- **/

    @hasOne(() => User, {localKey: 'user_id', foreignKey: 'id'})
    public user: HasOne<typeof User>;

    @hasOne(() => Contact, {localKey: 'contact_id', foreignKey: 'id'})
    public contact: HasOne<typeof Contact>;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;
}
