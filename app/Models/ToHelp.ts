import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class ToHelp extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public to_help_text: string;

    /** ----------------------- HasOne --------------------------- **/

    @hasOne(() => User, {localKey: 'user_id', foreignKey: 'id'})
    public user_id: HasOne<typeof User>;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;
}