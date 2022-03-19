import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm';

export default class User extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public about: string;

    @column({ serializeAs: null })
    public password: string;

    @column()
    public email: string;

    @column()
    public icon_url: string;

    @column()
    public about_id: number;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @column.dateTime({ serializeAs: null })
    public deletedAt?: DateTime;
}