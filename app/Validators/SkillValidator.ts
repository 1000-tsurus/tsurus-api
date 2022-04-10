import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';

export default class SkillAttachValidator
{
    constructor (protected ctx: HttpContextContract)
    {}

    public schema = schema.create({
        skills_id: schema.array([rules.required()]).members(
            schema.number([
                rules.required(),
                rules.exists({ column: 'id', table: 'skill_categories' }),
            ])
        ),
    });
}
