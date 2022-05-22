import Route from '@ioc:Adonis/Core/Route';

Route.group(() =>
{
    /* ---------- POSTS ---------- */
    Route.post('login', 'AuthController.login');
    Route.post('create-code', 'AuthController.createCode');
}).prefix('auth');
