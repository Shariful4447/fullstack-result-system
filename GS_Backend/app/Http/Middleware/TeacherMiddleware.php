<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class TeacherMiddleware
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
        if (auth()->user()->role === 'teacher') {
            return $next($request);
        }

        return response()->json([
            'success' => false,
            'message' => 'Unauthorized teacher !! Access Restricted!'
        ], 401);
    }
}
