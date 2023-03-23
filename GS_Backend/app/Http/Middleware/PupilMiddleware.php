<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class PupilMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // $credentials = $request->only('userid', 'password');
        if(auth()->user()->role === 'pupil'){ 
            return $next($request);
        }
        else {
            return response()->json([
                'success'=> false,
                'message' => 'Unauthorized User !! Access Restricted!'
            ] , 401);
        }
    }
}
