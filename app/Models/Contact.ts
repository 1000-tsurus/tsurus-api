import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Phone from './Phone';

export default class Contact extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public contact_email: string;

    @column()
    public linkedin_url: string;

    @column()
    public instagram_url: string;

    @column()
    public personal_url: string;

    public phone_id: HasOne<typeof Phone>;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;
}
