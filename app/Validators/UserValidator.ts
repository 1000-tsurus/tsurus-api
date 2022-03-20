import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';

export class UserValidator
{
    constructor (private ctx: HttpContextContract)
    {}

    public schema = schema.create({
        full_name: schema.string({}, [rules.required()]),
        password: schema.string({}, [rules.required()]),
        email: schema.string({}, [rules.required()]),
        icon_url: schema.string.optional({}),
        about: schema.string({}, [rules.required()]),
        occupation_name: schema.string({}, [rules.required()]),
        trajectory_text: schema.string({}, [rules.required()]),
        to_help_text: schema.string({}, [rules.required()]),
        role: schema.string({}, [rules.required()]),
        employer: schema.string({}, [rules.required()]),
        skill_name: schema.string({}, [rules.required()]),
        entry_date_time: schema.date({}, [rules.required()]),
        phone: schema.object().members({
            ddd: schema.string({ trim: true }, [
                rules.minLength(2),
                rules.maxLength(3),
                rules.required(),
            ]),
            phone_number: schema.string({ trim: true }, [
                rules.minLength(8),
                rules.maxLength(9),
                rules.required(),
            ]),
            country_code: schema.string.optional({ trim: true }, [
                rules.minLength(2),
                rules.maxLength(2),
            ]),
            is_wpp: schema.boolean(),
            is_public: schema.boolean(),
        }),
    });
}
