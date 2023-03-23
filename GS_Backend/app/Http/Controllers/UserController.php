<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth:api', 'admin'])->only(['index', 'store', 'update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $users = User::orderBy('id', 'desc')->where("role", "!=", "admin")->get();
            return response()->json([
                'success' => true,
                'message' => 'Display All The Users List',
                'data'  => $users

            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'errors' => ["notFound" => ['Users not found']],
            ], 401);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'user_name' => 'required|unique:users|string',
            'userid' => 'unique:users|string',
            'role' => 'required|string',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $userid = $request->role == 'admin' ? 'A-' . random_int(100000, 999999) : (($request->role == 'teacher') ? 'T-' . random_int(100000, 999999) : 'P-' . random_int(100000, 999999));
            $user = User::create([
                // 'userid' =>$request->userid,
                // 'userid' =>random_int(100000, 999999), //Auto generated id by the system
                'userid' => $userid, //Auto generated id by the system
                'user_name' => $request->user_name,
                'fname' => $request->fname,
                'lname' => $request->lname,
                'role' => $request->role,
                'remember_token' => NULL,
                'password' => Hash::make($request->password)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'User Created Successfully!!!',
                'data' => $user
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'errors' => ["server" => ['Something Went Worng...!!!']]
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     * @return \Illuminate\Http\JsonResponse
     */
    // public function show($userid)
    // {
    //     try {
    //         // $users = User::find($userid);
    //         $users = User::where('userid', $userid)->get();
    //         if (count($users) > 0) {
    //             return response()->json([
    //                 'success' => true,
    //                 'message' => 'Display the specific User',
    //                 'data'  => $users
    //             ], 302);
    //         } else {
    //             return response()->json([
    //                 'success' => false,
    //                 'errors' => ["notFound" => ['No User is available At that ID']],
    //             ], 404);
    //         }
    //     } catch (\Throwable $th) {
    //         return response()->json([
    //             'success' => false,
    //             'errors' => ["server" => ['Something went wrong']],
    //         ], 401);
    //     }
    // }

    //    showByRole
    public function showByRole($role)
    {
        try {
            // $users = User::find($userid);
            $users = User::where('role', $role)->get();
            if (count($users) > 0) {
                return response()->json([
                    'success' => true,
                    'message' => 'Display the specific User by role',
                    'data'  => $users
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'errors' => ["notFound" => ['No Users founds by this role']],
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'errors' => ["server" => ['Something went wrong']],
            ], 401);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [

            //'userid' => 'required|unique:users|numeric',
            'user_name' => 'unique:users',
            'password' => 'min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {

            $user = User::findorfail($id);
            //$user = User::where('userid', $userid)->get();
            // dd($user);
            // $user->userid = $request->userid;
            if ($request->user_name && $request->user_name !== $user->user_name) {
                $user->user_name = $request->user_name;
            }
            $user->fname = $request->fname ? $request->fname : $user->fname;
            $user->lname = $request->lname ? $request->lname : $user->lname;
            $user->remember_token = NULL;
            $user->password =  $request->password ? Hash::make($request->password) : $user->password;
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'User Data Updated Successfully!!!',
                'data' => $user
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'errors' => ["updateFailed" => ['User Data Update failed!!!']],
            ], 401);
        }
    }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function destroy($userid)
    // {   
    //     try {
    //         $users = User::where('userid',$userid)->delete();
    //         return response()->json([
    //             'success'=> true,
    //             'message' => 'User Deleted Successfully!',

    //         ] , 200);
    //     } 
    //     catch (\Throwable $th) {
    //         return response()->json([
    //             'success'=> false,
    //             'message' => 'Somthing Went Wrong...!!!',
    //         ] , 401);
    //     }
    // }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $user = User::where('id', $id)->first();
            //deleting the teacher
            if ($user->role === 'teacher') {
                $subject_teacher = Subject::where('teacher_id', $id)->get();
                foreach ($subject_teacher as $value) {
                    if (count($subject_teacher) > 0 and $value->status == 1) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Teacher cannot be Deleted cause He/She is already assigned to Subject!',

                        ], 401);
                    } else if (count($subject_teacher) > 0 and $value->status == 0) {
                        $user->delete();
                        return response()->json([
                            'success' => true,
                            'message' => 'Teacher Deleted Successfully!',

                        ], 200);
                    }
                }
                $user->delete();
                return response()->json([
                    'success' => true,
                    'message' => 'Teacher Deleted Successfully!',

                ], 200);
            }
            //  deleting the pupil
            elseif ($user->role === 'pupil') {
                $pupil_result = Result::where('pupil_id', $id)->get();
                //  dd(count($pupil_result));
                if (count($pupil_result) > 0) {
                    foreach ($pupil_result as  $value) {
                        $value->delete();
                    }
                    $user->delete();
                    return response()->json([
                        'success' => true,
                        'message' => 'Pupil And Their All Results Deleted Successfully!',

                    ], 200);
                } else {
                    $user->delete();
                    return response()->json([
                        'success' => true,
                        'message' => 'Pupil Deleted Successfully!',

                    ], 200);
                }
            } else {
                $user->delete();
                return response()->json([
                    'success' => true,
                    'message' => 'Admin Deleted Successfully!',

                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Somthing Went Wrong... while deleting the user!!!',
            ], 401);
        }
    }

    /**
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        $credentials = $request->only('userid', 'password');
        $data = User::where('userid', $request->userid)->first();

        if ($token = auth()->attempt($credentials)) {
            return $this->respondWithToken($token, $data);
        }

        return response()->json(['message' => 'Login failed!'], 401);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh($data)
    {
        return $this->respondWithToken(auth()->refresh(), $data);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     * @param  string $data
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token, $data)
    {
        return response()->json([
            'success' => true,
            'user' => $data,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60 * 24
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }


    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out'], 200);
    }
}
