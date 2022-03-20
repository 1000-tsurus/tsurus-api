import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class Phone extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public phone_number: string;

    @column()
    public ddd: string;

    @column()
    public country_code: string;

    @column()
    public is_wpp: boolean;

    @column()
    public is_public: boolean;

    @column.dateTime({ autoCreate: true })
    public updated_at: DateTime;

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime;
}
