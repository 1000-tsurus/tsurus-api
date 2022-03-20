import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import About from 'App/Models/About';
import Employer from 'App/Models/Employer';
import Occupation from 'App/Models/Occupation';
import SkillCategory from 'App/Models/SkillCategory';
import ToHelp from 'App/Models/ToHelp';
import Trajectory from 'App/Models/Trajectory';
import User from 'App/Models/User';
import UserOccupation from 'App/Models/UserOccupation';
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

        let created_user: User | null = null;

        try
        {
            created_user = await User.create({
                full_name,
                password,
                email,
                icon_url,
                about,
            });
        }
        catch (error)
        {
            response.internalServerError(error);
        }

        if (created_user)
        {
            let created_occupation: Occupation | null = null,
                created_trajectory: Trajectory | null = null,
                created_to_help: ToHelp | null = null,
                created_employer: Employer | null = null,
                created_skill_category: SkillCategory | null = null;

            try
            {
                created_occupation = await Occupation.create({
                    occupation_name,
                    occupation_date_time: entry_date_time,
                    createdAt: DateTime.local(),
                });

                created_trajectory = await Trajectory.create({
                    trajectory_text,
                    createdAt: DateTime.local(),
                });

                created_to_help = await ToHelp.create({
                    to_help_text,
                    createdAt: DateTime.local(),
                });

                created_employer = await Employer.create({
                    employer,
                    entry_date_time,
                    role,
                    createdAt: DateTime.local(),
                });

                created_skill_category = await SkillCategory.create({
                    skill_name,
                });
            }
            catch (error)
            {
                response.internalServerError(error);
            }

            if (
                created_occupation &&
                created_trajectory &&
                created_to_help &&
                created_employer &&
                created_skill_category
            )
            {
                try
                {
                    // salva as relações em tabelas pivots
                    await UserOccupation.create({
                        user_id: created_user.id,
                        occupation_id: created_occupation.id,
                    });
                }
                catch (error)
                {
                    response.internalServerError(error);
                }
            }
        }
    }
}
