import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';

export default class LoginValidator
{
    constructor (protected ctx: HttpContextContract)
    {}

    public schema = schema.create({
        cpf: schema.string.optional({ trim: true }, [
            rules.exists({ column: 'cpf', table: 'users' }),
            rules.minLength(11),
            rules.maxLength(11),
            rules.regex(/^[0-9]+$/),
        ]),
        email: schema.string.optional({ trim: true }, [
            rules.email(),
            rules.exists({ column: 'email', table: 'users' }),
        ]),
        password: schema.string({ trim: true }, [rules.required()]),
    });
}
