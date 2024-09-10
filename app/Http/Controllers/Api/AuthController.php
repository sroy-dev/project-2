<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Auth;

class AuthController extends Controller
{

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
        $this->middleware('auth')->only('logout');
    }


    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $attempt = Auth::attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password']
        ], $credentials['remember'] ?? false);

        if ($attempt) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->success([
                'token' => $token,
                'user' => $user
            ]);
        }

        return response()->error('Invalid credentials', 401);
    }
}