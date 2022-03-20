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
    });
}
