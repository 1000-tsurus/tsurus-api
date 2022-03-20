import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Employer from 'App/Models/Employer';
import Occupation from 'App/Models/Occupation';
import Phone from 'App/Models/Phone';
import SkillCategory from 'App/Models/SkillCategory';
import ToHelp from 'App/Models/ToHelp';
import Trajectory from 'App/Models/Trajectory';
import User from 'App/Models/User';
import UserEmployer from 'App/Models/UserEmployer';
import UserOccupation from 'App/Models/UserOccupation';
import PhoneUser from 'App/Models/UserPhone';
import UserSkillCategory from 'App/Models/UserSkillCategory';
import UserToHelp from 'App/Models/UserToHelp';
import UserTrajectory from 'App/Models/UserTrajetory';
import { UserValidator } from 'App/Validators/UserValidator';
import {DateTime} from 'luxon';

export default class UserController
{
    public async index ({ response }: HttpContextContract)
    {
        let all_users = await User.query();

        for(let user of all_users)
        {
            await user.load('employer');
            await user.load('abouts');
            await user.load('contact');
            await user.load('occupation');
            await user.load('skill_category');
            await user.load('to_help');
            await user.load('trajectory');
            await user.load('phone');
        }

        response.ok(all_users);
    }

    public async store ({ response, request }: HttpContextContract)
    {
        const {
            full_name,
            password,
            email,
            icon_url,
            phone,
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
                type_id: 1,
                created_at: DateTime.now(),
            });
        }
        catch (error)
        {
            response.internalServerError(error);
        }

        if (created_user)
        {
            let created_phone: Phone | null = null,
                created_occupation: Occupation | null = null,
                created_trajectory: Trajectory | null = null,
                created_to_help: ToHelp | null = null,
                created_employer: Employer | null = null,
                created_skill_category: SkillCategory | null = null;

            try
            {
                created_phone = await Phone.create({
                    country_code: phone.country_code,
                    ddd: phone.ddd,
                    phone_number: phone.phone_number,
                    is_wpp: phone.is_wpp,
                    is_public: phone.is_public,
                    created_at: DateTime.now(),
                });

                created_occupation = await Occupation.create({
                    occupation_name,
                    occupation_date_time: entry_date_time,
                    created_at: DateTime.now(),
                });

                created_trajectory = await Trajectory.create({
                    trajectory_text,
                    created_at: DateTime.local(),
                });

                created_to_help = await ToHelp.create({
                    to_help_text,
                    created_at: DateTime.local(),
                });

                created_employer = await Employer.create({
                    employer,
                    entry_date_time,
                    role,
                    created_at: DateTime.local(),
                });

                created_skill_category = await SkillCategory.create({
                    skill_name,
                    created_at: DateTime.local(),
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
                created_skill_category &&
                created_phone
            )
            {
                try
                {
                    // salva as relações em tabelas pivots
                    await PhoneUser.create({
                        user_id: created_user.id,
                        phone_id: created_phone.id,
                        created_at: DateTime.local(),
                    });

                    await UserOccupation.create({
                        user_id: created_user.id,
                        occupation_id: created_occupation.id,
                        created_at: DateTime.local(),
                    });

                    await UserTrajectory.create({
                        user_id: created_user.id,
                        trajectory_id: created_trajectory.id,
                        created_at: DateTime.local(),
                    });

                    await UserToHelp.create({
                        user_id: created_user.id,
                        to_help_id: created_to_help.id,
                        created_at: DateTime.local(),
                    });

                    await UserEmployer.create({
                        user_id: created_user.id,
                        employer_id: created_employer.id,
                        created_at: DateTime.local(),
                    });

                    await UserSkillCategory.create({
                        user_id: created_user.id,
                        skill_category_id: created_skill_category.id,
                        created_at: DateTime.local(),
                    });

                    response.ok(created_user);
                }
                catch (error)
                {
                    response.internalServerError(error);
                }
            }
        }
    }
}
