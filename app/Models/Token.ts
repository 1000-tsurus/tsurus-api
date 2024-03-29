import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class ToHelp extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public type: number;

    @column()
    public token: string;

    @column()
    public user_id: number;

    /** ----------------------- HasOne --------------------------- **/

    @hasOne(() => User, {localKey: 'user_id', foreignKey: 'id'})
    public user: HasOne<typeof User>;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;
}
