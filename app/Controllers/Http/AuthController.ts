'use strict';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import ValidationCode from 'App/Models/ValidationCodes';
import LoginValidator from 'App/Validators/LoginValidator';
import { DateTime } from 'luxon';

export default class AuthController
{
    public async login ({ auth, request, response }: HttpContextContract)
    {
        const { email, password } = await request.validate(LoginValidator);
        let user: User | null = null,
            token: Record<string, any> | null = null;

        if (email)
        {
            /* Verifica soft_delete */
            user = await User.query().where('email', email).andWhereNull('deleted_at').firstOrFail();

            token = await auth.use('api').attempt(email, password);
        }

        return response.send({ user, token: token?.token });
    }

    public async createCode ({ response, request }: HttpContextContract)
    {
        const { email } = await request.validate(LoginValidator);
        let code = String(Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000);

        try
        {
            if (email)
            {
                let user = await User.findByOrFail('email', email),
                    expiration_date_time = DateTime.local().plus({ hours: 2 });

                await ValidationCode.create({
                    code,
                    expiration_date_time,
                    user_id: user.id,
                });

                return response.ok({ message: 'Código enviado com sucesso!' });
            }
            else
            {
                return response.notFound({ message: 'Email inválido!' });
            }
        }
        catch (err)
        {
            return response.internalServerError({ message: err.message });
        }
    }
}
