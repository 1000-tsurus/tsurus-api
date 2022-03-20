import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { column, beforeSave, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import About from './About';
import Phone from './Phone';

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

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @column.dateTime({ serializeAs: null })
    public deletedAt?: DateTime;

    /** ----------------------- HasOne --------------------------- **/

    @hasOne(() => About, {localKey: 'about_id', foreignKey: 'id'})
    public about_id: HasOne<typeof About>;

    @hasOne(() => Phone, {localKey: 'phone_id', foreignKey: 'id'})
    public phone_id: HasOne<typeof Phone>;

    @beforeSave()
    public static async hashPassword (user: User)
    {
        if (user.$dirty.password)
        {
            user.password = await Hash.make(user.password);
        }
    }
}
