import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import About from './About';

export default class UserAbout extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public about_id: number;

    @column()
    public user_id: number;

    /** ----------------------- HasOne --------------------------- **/

    @hasOne(() => About, {localKey: 'about_id', foreignKey: 'id'})
    public about: HasOne<typeof About>;

    @hasOne(() => User, {localKey: 'user_id', foreignKey: 'id'})
    public user: HasOne<typeof User>;

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updated_at: DateTime;

    @column.dateTime({ serializeAs: null })
    public deleted_at?: DateTime;
}
