import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UserController
{
    public async index ({ response }: HttpContextContract)
    {
        let all = await User.query();

        response.ok(all);
    }
}
