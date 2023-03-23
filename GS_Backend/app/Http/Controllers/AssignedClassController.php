<?php

namespace App\Http\Controllers;

use App\Models\AssignedClassModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AssignedClassController extends Controller
{
    public function index()
    {
        try {
            $AssignedClassController = AssignedClassModel::orderBy('id' , 'desc')->get();
            return response()->json([
                'success'=> true,
                'message' => 'Display All The Pupil and their Class List',
                'data'  => $AssignedClassController

            ] , 200);
        } 
        catch (\Throwable $th) {
            return response()->json([
                'success'=> false,
                'message' => 'Unauthorized User',
            ] , 401);
        }
       
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[

            'MyClass_id' => 'required|numeric',
            'pupil_id' => 'required|numeric'
        ]);

        if($validator->fails()){
            return response()->json([
                'success'=> false,
                'errors' => $validator->errors()
                ], 422);
        }

        try 
        {
                $AssignedPupilCheckValue = AssignedClassModel::orderBy('id' ,'desc')->where('pupil_id' ,$request->pupil_id)->get();
            //   dd(count($AssignedPupilCheckValue));
                if(count($AssignedPupilCheckValue) > 0)
                {
                    $AssignedClassCheck = AssignedClassModel::where('id' , $AssignedPupilCheckValue[0]->id)->get();
                    //  dd($AssignedClassCheck[0]->MyClass_id);
                    if($AssignedClassCheck[0]->MyClass_id == $request->MyClass_id )
                    {
                        return response()->json([
                            'success'=> false,
                            'message' =>'Nothing to Change Pupil Already exists in the class!!!',
                        ], 400);
                    }
                    else
                    {
                        $AssignedClassCheck[0]->MyClass_id = $request->MyClass_id;
                        $AssignedClassCheck[0]->save();
                        return response()->json([
                            'success'=> true,
                            'message' =>'Pupil is Assigned to a new class And disassign form the previous One!!!',
                            'data' => $AssignedClassCheck,
                        ], 201);

                    }
                    
                }
                else
                {
                    $AssignedClassModel = new AssignedClassModel;
                    $AssignedClassModel->MyClass_id = $request->MyClass_id;
                    $AssignedClassModel->pupil_id = $request->pupil_id;
                    $AssignedClassModel->save();
                    return response()->json([
                        'success'=> true,
                        'message' =>'Assigned Class Created Successfully!!!',
                        'data' => $AssignedClassModel,
                    ], 201);
                }         
        } 
        catch (\Throwable $th) 
        {
            return response()->json([
                'success'=> false,
                'message' =>'Something Went Worng...While creating the Assigned Class!!!'
                ], 400);
        }
        
    }
}
