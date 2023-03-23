<?php

use App\Http\Controllers\ClassController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\MiscellaneousController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\PupilController;
use App\Http\Controllers\AssignedClassController;



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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


//login & logout Crontrollers
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']);

// Admin routes start
Route::get('/class/index', [ClassController::class, 'index'])->middleware(['auth:api', 'admin']);
Route::post('/class/create/store', [ClassController::class, 'store'])->middleware(['auth:api', 'admin']);
Route::patch('/class/update/{id}', [ClassController::class, 'update'])->middleware(['auth:api', 'admin']);
Route::delete('/class/delete/{id}', [ClassController::class, 'delete'])->middleware(['auth:api', 'admin']);
Route::get('/subject/index', [SubjectController::class, 'index'])->middleware(['auth:api', 'admin']);
Route::post('/subject/create/store', [SubjectController::class, 'store'])->middleware(['auth:api', 'admin']);
Route::post('/subject/update/{id}', [SubjectController::class, 'update'])->middleware(['auth:api', 'admin']);
Route::delete('/subject/delete/{id}', [SubjectController::class, 'delete'])->middleware(['auth:api', 'admin']);
Route::patch('/subject/archive/{id}', [SubjectController::class, 'subjectArchive'])->middleware(['auth:api', 'admin']);
Route::get('/users/{role}', [UserController::class, 'showByRole'])->middleware(['auth:api', 'admin']);
// Admin routes end

Route::resource('/users', UserController::class);

// Teacher routes start
Route::get('/test/index/{teacherId}/{subjectId}', [TestController::class, 'index'])->middleware(['auth:api', 'teacher']);
Route::post('/test/create/store', [TestController::class, 'store'])->middleware(['auth:api', 'teacher']);
Route::put('/test/update/{id}', [TestController::class, 'update'])->middleware(['auth:api', 'teacher']);
Route::delete('/test/delete/{id}', [TestController::class, 'delete'])->middleware(['auth:api', 'teacher']);
Route::get('/teacher/test-pupil-option/{teacherId}/{subjectId}', [MiscellaneousController::class, 'teacherTestPupilOption'])->middleware(['auth:api', 'teacher']);
Route::get('/teacher/assign/subject/{id}', [MiscellaneousController::class, 'teacherAssignSubject'])->middleware(['auth:api', 'teacher']);
Route::get('/teacher/average-grade/{teacher_id}/{subject_id}', [MiscellaneousController::class, 'teacherAverageGrade'])->middleware(['auth:api', 'teacher']);
Route::get('/result/index/{teacherId}/{subjectId}/{testId}', [ResultController::class, 'index'])->middleware(['auth:api', 'teacher']);
Route::post('/result/create/store', [ResultController::class, 'store'])->middleware(['auth:api', 'teacher']);
Route::patch('/result/update/{id}', [ResultController::class, 'update'])->middleware(['auth:api', 'teacher']);
Route::delete('/result/delete/{id}', [ResultController::class, 'delete'])->middleware(['auth:api', 'teacher']);
Route::post('/result/upload', [ResultController::class, 'Upload'])->middleware(['auth:api', 'teacher']);
// Teacher routes end


// Pupils routes start
Route::get('/pupil/average-grade/{id}', [PupilController::class, 'pupilIndividualAverageGrade'])->middleware(['auth:api', 'pupil']);
Route::get('/pupil/subject-wise-test-grade/{id}/{subject_id}', [PupilController::class, 'subjectWiseTestGrade'])->middleware(['auth:api', 'pupil']);
// Pupils routes end

// User By Role
// Route::get('/users/{role}', [UserController::class, 'showByRole']);
//User Crontrollers
// Route::resource('/users', UserController::class);


//Class Crontrollers
// Route::get('/class/index', [ClassController::class, 'index']);
// Route::get('/class/show/{name}', [ClassController::class, 'show']);
// Route::post('/class/create/store', [ClassController::class, 'store']);
// Route::patch('/class/update/{id}', [ClassController::class, 'update']);
// Route::delete('/class/delete/{id}', [ClassController::class, 'delete']);


//Subject Crontrollers
// Route::get('/subject/index', [SubjectController::class, 'index']);
// Route::get('/subject/show/{name}', [SubjectController::class, 'show']);
// Route::post('/subject/create/store', [SubjectController::class, 'store']);
// Route::post('/subject/update/{id}', [SubjectController::class, 'update']);
// Route::post('/subject/delete/{id}', [SubjectController::class, 'delete']);
// Route::put('/subject/archive/{id}', [SubjectController::class, 'subjectArchive']);



//Test Crontrollers
// Route::get('/test/index/{teacherId}/{subjectId}', [TestController::class, 'index']);
// Route::get('/test/show/{name}', [TestController::class, 'show']);
// Route::post('/test/create/store', [TestController::class, 'store']);
// Route::put('/test/update/{id}', [TestController::class, 'update']);
// Route::delete('/test/delete/{id}', [TestController::class, 'delete']);


//Result Crontrollers
// Route::get('/result/index/{teacherId}/{subjectId}/{testId}', [ResultController::class, 'index']);
// Route::get('/result/average-grade-list', [ResultController::class, 'avarageGradeList']);
// Route::get('/result/show/{teacher_id}/{pupil_id}/{subject_id}', [ResultController::class, 'show']);
// Route::post('/result/create/store', [ResultController::class, 'store']);
// Route::patch('/result/update/{id}', [ResultController::class, 'update']);
// Route::delete('/result/delete/{id}', [ResultController::class, 'delete']);
// Route::post('/result/upload', [ResultController::class, 'Upload']);


//AssignedClassController Crontrollers
// Route::get('/AssignedClassController/index', [AssignedClassController::class, 'index']);
// Route::get('/AssignedClassController/show/{name}' , [AssignedClassController::class , 'show']);
// Route::post('/AssignedClassController/create/store', [AssignedClassController::class, 'store']);
// Route::post('/AssignedClassController/update/{id}' , [AssignedClassController::class , 'update']);
// Route::post('/AssignedClassController/delete/{id}' , [AssignedClassController::class , 'delete']);

//Miscellaneous Controllers
// Route::get('/teacher-list', [MiscellaneousController::class, 'teacherlist']);
// Route::get('/class-list', [MiscellaneousController::class, 'classlist']);
// Route::get('/teacher/assign/subject/{id}', [MiscellaneousController::class, 'teacherAssignSubject']);
// Route::get('/teacher/average-grade/{teacher_id}/{subject_id}', [MiscellaneousController::class, 'teacherAverageGrade']);
// Route::get('/test-list', [MiscellaneousController::class, 'testList']);
// Route::get('/teacher/test-pupil-option/{teacherId}/{subjectId}', [MiscellaneousController::class, 'teacherTestPupilOption']);

