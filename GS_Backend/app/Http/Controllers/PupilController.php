<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class PupilController extends Controller
{
    public function pupilIndividualAverageGrade($id)
    {
        try {

            $average_grade_by_individual_pupils = DB::table('results')
            ->join('users', 'users.id', '=', 'results.pupil_id')
            ->join('subjects', 'subjects.id', '=', 'results.subject_id')
            ->select('users.userid','users.fname','users.lname','users.id as db_User_id','subjects.name as subject_name','subjects.id as subject_id', DB::raw('AVG(grade) as averageGrade'))
            ->where('users.id' ,$id )
            ->groupBy('subject_id')
            ->get();

            return response()->json([
                'success'=> true,
                'message' => 'Display All The Test Result by Pupils Average Grade',
                'data'  => $average_grade_by_individual_pupils

            ] , 200);
        } 
        catch (\Throwable $th) {
            return response()->json([
                'success'=> false,
                'message' => 'Unauthorized User',
            ] , 401);
        }
       
    }

    public function subjectWiseTestGrade($id , $subject_id)
    {
        try {

            $subject_Wise_Test_Grade = DB::table('results')
            ->join('users', 'users.id', '=', 'results.pupil_id')
            ->join('subjects', 'subjects.id', '=', 'results.subject_id')
            ->join('tests', 'tests.id', '=', 'results.test_id')
            ->select('users.userid','users.fname','users.lname','users.id as db_User_id','subjects.name as subject_name','subjects.id as subject_id','tests.id as test_id','tests.name as test_name','tests.test_date as test_date', 'grade')
            ->where('users.id' ,$id)
            ->where('results.subject_id' , $subject_id)
            ->get();


            if(count($subject_Wise_Test_Grade) <= 0){
                return response()->json([
                    'success'=> false,
                    'message' => 'Subject or Pupil ID is Invalid',
                    'data'=> null
                ] , 404);
            }
            else{

            return response()->json([
                'success'=> true,
                'message' => 'Display All The Test Result by Subject Wise Grade',
                'data'  => $subject_Wise_Test_Grade

            ] , 200);

            }
        } 
        catch (\Throwable $th) {
            return response()->json([
                'success'=> false,
                'message' => 'Unauthorized User',
            ] , 401);
        }
       
    }

    
}
