import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import SkillCategory from 'App/Models/SkillCategory';
import User from 'App/Models/User';
import UserSkill_category from 'App/Models/UserSkillCategory';
import {SkillAttachValidator, CreateSkill } from 'App/Validators/SkillValidator';

export default class SkillController
{
    public async index ({ response }: HttpContextContract)
    {
        let all_skills = await SkillCategory
            .query();

        response.ok(all_skills);
    }

    public async store ({ response, request }: HttpContextContract)
    {
        const {
            name,
        } = await request.validate(CreateSkill);

        let created_skill: SkillCategory | null = null;

        try
        {
            created_skill = await SkillCategory.create({
                skill_name: name,
            });
        }
        catch (error)
        {
            return response.internalServerError(error);
        }

        return response.ok(created_skill);
    }

    public async attach ({ response, params, request }: HttpContextContract)
    {
        const {
                skills_id,
            } = await request.validate(SkillAttachValidator),
            user = await User.findOrFail(params.id);
        user.load('skill_category');

        if (user.skill_category.length < 5)
        {
            try
            {
                for(let skill of skills_id)
                {
                    await UserSkill_category.create({
                        user_id: user.id,
                        skill_category_id: skill,
                    });
                }
                return response.ok(user);
            }
            catch (error)
            {
                return response.internalServerError(error);
            }
        }
        else
        {
            return response.badRequest('You can not attach more than 5 skills');
        }
    }

    public async detach ({ response, params, request }: HttpContextContract)
    {
        const {
                skills_id,
            } = await request.validate(SkillAttachValidator),
            user = await User.findOrFail(params.id);
        user.load('skill_category');

        try
        {
            for(let skill of skills_id)
            {
                await UserSkill_category.query().where({
                    user_id: user.id,
                    skill_category_id: skill,
                }).delete();
            }
            return response.ok(user);
        }
        catch (error)
        {
            return response.internalServerError(error);
        }
    }
}
