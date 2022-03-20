import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import ToHelp from './ToHelp';

export default class UserToHelp extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public user_id: number;

    @column()
    public to_help_id: number;

    /** ----------------------- HasOne --------------------------- **/

    @hasOne(() => User, {localKey: 'user_id', foreignKey: 'id'})
    public user: HasOne<typeof User>;

    @hasOne(() => ToHelp, {localKey: 'to_help_id', foreignKey: 'id'})
    public to_help: HasOne<typeof ToHelp>;

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime;
}
