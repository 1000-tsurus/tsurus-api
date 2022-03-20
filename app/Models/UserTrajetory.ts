import { DateTime } from 'luxon';
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Trajectory from './Trajectory';

export default class UserTrajectory extends BaseModel
{
    @column({ isPrimary: true })
    public id: number;

    @column()
    public user_id: number;

    @column()
    public trajectory_id: number;

    /** ----------------------- HasOne --------------------------- **/

    @hasOne(() => User, {localKey: 'user_id', foreignKey: 'id'})
    public user: HasOne<typeof User>;

    @hasOne(() => Trajectory, {localKey: 'trajectory_id', foreignKey: 'id'})
    public trajectory: HasOne<typeof Trajectory>;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;
}
