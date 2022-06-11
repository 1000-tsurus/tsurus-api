import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Employer from 'App/Models/Employer';
import Phone from 'App/Models/Phone';
import ToHelp from 'App/Models/ToHelp';
import Trajectory from 'App/Models/Trajectory';
import User from 'App/Models/User';
import UserEmployer from 'App/Models/UserEmployer';
import UserLikeUser from 'App/Models/UserLikeUser';
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
        let all_users = await User
            .query()
            .preload('abouts')
            .preload('employer')
            .preload('abouts')
            .preload('contact')
            .preload('occupation')
            .preload('skill_category')
            .preload('to_help')
            .preload('trajectory')
            .preload('phone')
        
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
            trajectory_text,
            to_help_text,
            role,
            employer,
            entry_date_time,
            skills,
        } = await request.validate(UserValidator);

        let created_user: User | null = null;

        try
        {
            created_user = await User.create({
                full_name,
                password,
                email,
                icon_url,
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
                created_trajectory: Trajectory | null = null,
                created_to_help: ToHelp | null = null,
                created_employer: Employer | null = null

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
            }
            catch (error)
            {
                response.internalServerError(error);
            }

            if (
                created_trajectory &&
                created_to_help &&
                created_employer &&
                skills &&
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

                    for(let category of skills)
                    {
                        await UserSkillCategory.create({
                            user_id: created_user.id,
                            skill_category_id: category,
                            created_at: DateTime.local(),
                        });
                    }

                    response.ok(created_user);
                }
                catch (error)
                {
                    response.internalServerError(error);
                }
            }
        }
    }

    public async show ({ response, params }: HttpContextContract)
    {
        let target_user = await User
            .query()
            .where('id', params.userId)
            .preload('abouts')
            .preload('employer')
            .preload('abouts')
            .preload('contact')
            .preload('occupation')
            .preload('skill_category')
            .preload('to_help')
            .preload('trajectory')
            .preload('phone')
            .firstOrFail();

        let final_data;

        if(target_user)
        {
            final_data = target_user;  // retorna o objeto com todos os dados
            
            for(let key in final_data)
            {
                switch (final_data[key]) {
                    case null:
                        delete final_data[key];
                        break;
                    case 'password':
                        delete final_data[key];
                        break;
                    case 'phone_number':
                        delete final_data[key];
                        break;
                    case 'phone_number':
                        delete final_data[key];
                        break;
                    default:
                        break;
                }
            }
        }
    }

    public async likeUser ({ params, auth, response }: HttpContextContract)
    {
        const {user} = auth,
            {id} = params;

        if(!user){
            response.unauthorized('You must be logged in to like a user');
        }

        try {
            await UserLikeUser.create({
                user_id: user!.id,
                liked_user_id: id
            })

            return response.ok({liked: true});
        } catch (error) {
            return response.internalServerError(error);
        }
    }
}
