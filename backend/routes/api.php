<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\KpiController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\EvaluationHistoryController;
use App\Http\Controllers\HistoryProjectCotroller;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// ADMIN routes :
Route::group(['prefix' => 'user'], function () {
    Route::get('/', [UserController::class, 'getAll']);
});

// PLACE ALL THE REQUESTS THAT NEED AUTHENTICATION INSIDE
Route::group(['middleware' => ['jwt.verify']], function () {
});

// ADMIN routes :
Route::group(['prefix' => 'admin'], function () {
    Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('/token/check', [AdminController::class, 'checkToken']);
    });
    Route::get('/', [AdminController::class, 'getAll']);
    Route::get('/{id}', [AdminController::class, 'getOne']);
    Route::post('/', [AdminController::class, 'post']);
    Route::post('/{id}', [AdminController::class, 'edit']);
    Route::delete('/{id}', [AdminController::class, 'delete']);
    Route::post('/login/login', [AdminController::class, 'login']);
    Route::post('/{id}', [AdminController::class, 'edit']);
});

// EMPLOYEE routes :
Route::group(['prefix' => 'employee'], function () {
    Route::get('/', [EmployeeController::class, 'getAll']);
    Route::get('/{id}', [EmployeeController::class, 'getOne']);
    Route::post('/', [EmployeeController::class, 'add']);
    Route::post('/edit/{id}', [EmployeeController::class, 'edit']);
    Route::delete('/{id}', [EmployeeController::class, 'delete']);
    Route::post('/attach-kpi/{id}', [EmployeeController::class, 'attachKpi']);
    Route::post('/detach-kpi/{id}', [EmployeeController::class, 'detachKpi']);
    Route::post('/attach-team/{id}', [EmployeeController::class, 'attachTeam']);
    Route::post('/detach-team/{id}', [EmployeeController::class, 'detachTeam']);
    Route::post('/attach-role', [EmployeeController::class, 'attachRole']);
    Route::post('/evaluation/{id}', [EmployeeController::class, 'evaluation']);
});

//project routes
Route::group(['prefix' => 'project'], function () {
    Route::get('/', [ProjectController::class, 'getAll']);
    Route::get('/{id}', [ProjectController::class, 'getOne']);
    Route::post('/', [ProjectController::class, 'add']);
    Route::post('/test/history', [HistoryProjectCotroller::class, 'get']);
    Route::post('/edit/{id}', [ProjectController::class, 'update']);
    Route::delete('/{id}', [ProjectController::class, 'delete']);
});

//team routes
Route::group(['prefix' => 'team'], function () {
    Route::get('/', [TeamController::class, 'getAll']);
    Route::get('/{id}', [TeamController::class, 'getOne']);
    Route::post('/', [TeamController::class, 'add']);
    Route::post('/edit/{id}', [TeamController::class, 'update']);
    Route::delete('/{id}', [TeamController::class, 'delete']);
});

//role routes
Route::group(
    ['prefix' => 'role'],
    function () {
        Route::get('/', [RoleController::class, 'getAll']);
        Route::get('/{id}', [RoleController::class, 'getOne']);
        Route::post('/', [RoleController::class, 'add']);
        Route::post('/{id}', [RoleController::class, 'update']);
        Route::delete('/{id}', [RoleController::class, 'delete']);
    }
);

//kpi routes
Route::group(
    ['prefix' => 'kpi'],
    function () {
        Route::get('/', [KpiController::class, 'getAll']);
        Route::get('/{id}', [KpiController::class, 'getOne']);
        Route::post('/', [KpiController::class, 'add']);
        Route::post('/{id}', [KpiController::class, 'update']);
        Route::delete('/{id}', [KpiController::class, 'delete']);
        Route::post('/attach/{id}', [KpiController::class, 'attach']);
    }
);

//team routes
Route::group(['prefix' => 'team'], function () {
    Route::get('/', [TeamController::class, 'getAll']);
    Route::get('/{id}', [TeamController::class, 'getOne']);
    Route::post('/', [TeamController::class, 'add']);
    Route::post('/edit/{id}', [TeamController::class, 'update']);
    Route::delete('/{id}', [TeamController::class, 'delete']);
});
Route::group(['prefix' => 'history'], function () {
    Route::post('/search', [EvaluationHistoryController::class, 'get']);
    Route::post('/', [EvaluationHistoryController::class, 'add']);
    Route::get('/edit', [EvaluationHistoryController::class, 'getOne']);
});
