import Route from '@ioc:Adonis/Core/Route';

Route.group(() =>
{
    /* ---------- GET ---------- */
    Route.get('index', 'SkillController.index');
    /* ---------- POSTS ---------- */
    Route.post('store', 'UserController.store');
    /* ---------- PUT ---------- */
    // Route.put('update', 'UserController.update');
    /* ---------- DELETE ---------- */
    // Route.delete('destroy', 'UserController.destroy');
}).prefix('skills');
