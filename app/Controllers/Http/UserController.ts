import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import About from 'App/Models/About';
import Employer from 'App/Models/Employer';
import Occupation from 'App/Models/Occupation';
import SkillCategory from 'App/Models/SkillCategory';
import ToHelp from 'App/Models/ToHelp';
import Trajectory from 'App/Models/Trajectory';
import User from 'App/Models/User';
import { UserValidator } from 'App/Validators/UserValidator';
import {DateTime} from 'luxon';

export default class UserController
{
    public async index ({ response }: HttpContextContract)
    {
        let all_users = await User.query();

        response.ok(all_users);
    }

    public async store ({ response, request }: HttpContextContract)
    {
        const {
            full_name,
            password,
            email,
            icon_url,
            about,
            occupation_name,
            trajectory_text,
            to_help_text,
            role,
            employer,
            entry_date_time,
            skill_name,
        } = await request.validate(UserValidator);

        let cache_user = new User(),
            cache_about = new About(),
            cache_occupation = new Occupation(),
            cache_trajectory = new Trajectory(),
            cache_to_help = new ToHelp(),
            cache_employer = new Employer(),
            cache_skill_category = new SkillCategory();

        /* ------ user infos ------ */
        cache_user.full_name = full_name;
        cache_user.password = password;
        cache_user.email = email;
        cache_user.type_id = 1;
        cache_user.icon_url = icon_url || 'https://picsum.photos/300';
        cache_user.createdAt = DateTime.local();
        cache_user.updatedAt = DateTime.local();

        /* ------ user infos ------ */
        cache_about.about = about;

        /* ------ occupation infos ------ */
        cache_occupation.occupation_name = occupation_name;
        cache_occupation.occupation_date_time = DateTime.local();

        /* ------ trajectory infos ------ */
        cache_trajectory.trajectory_text = trajectory_text;
        cache_trajectory.createdAt = DateTime.local();

        /* ------ to_help infos ------ */
        cache_to_help.to_help_text = to_help_text;
        cache_to_help.createdAt = DateTime.local();

        /* ------ employer infos ------ */
        cache_employer.employer = employer;
        cache_employer.entry_date_time = entry_date_time;
        cache_employer.role = role;

        /* ------ skill_category infos ------ */
        cache_skill_category.skill_name = skill_name;

        // eslint-disable-next-line one-var
        let created_user: User| null = null;

        try
        {
            created_user = await cache_user.save();
        }
        catch (error)
        {
            response.internalServerError(error);
        }

        if(created_user)
        {
            try
            {
                // cache_about.user_id = created_user.id;
                cache_about = await cache_about.save();
            }
            catch (error)
            {
                response.internalServerError(error);
            }
        }
    }
}
