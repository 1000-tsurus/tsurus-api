import Route from '@ioc:Adonis/Core/Route';

Route.group(() =>
{
    /* ---------- GET ---------- */
    Route.get('index', 'UserController.index');
    Route.get('show/:userId', 'UserController.show');
    /* ---------- POSTS ---------- */
    Route.post('store', 'UserController.store');
    /* ---------- PUT ---------- */
    // Route.put('update', 'UserController.update');
    /* ---------- DELETE ---------- */
    // Route.delete('destroy', 'UserController.destroy');
}).prefix('user');
