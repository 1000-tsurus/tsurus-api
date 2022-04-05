'use strict';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import LoginValidator from 'App/Validators/LoginValidator';

export default class AuthController
{
    public async login ({ auth, request, response}: HttpContextContract)
    {
        const { email, password } = await request.validate(LoginValidator);
        let user: User | null = null,
            token: Record<string, any> | null = null;

        if(email)
        {
            user = await User.findByOrFail('email', email);
            token = await auth.use('api').attempt(email, password);
        }

        return response.send({ user, token: token?.token });
    }
}
