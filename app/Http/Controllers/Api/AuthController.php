<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\User;
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
        // $this->middleware('guest')->except('logout');
        // $this->middleware('auth')->only('logout');
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


    public function register(Request $request)
    {
        $credentials = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'repeat_password' => 'required',
            'team_name' => 'required',
        ]);

        $user = User::create([
            'name' => $credentials['name'],
            'email' => $credentials['email'],
            'password' => bcrypt($credentials['password']),
            'user_type' => 'owner'
        ]);

        $team = Team::create([
            'name' => $credentials['team_name'],
            'user_id' => $user->id
        ]);

        $user->update(['team_id' => $team->id]);


        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->success([
            'token' => $token,
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->success('Logged out successfully');
    }

    public function me(Request $request)
    {
        $user = $request->user();
        // add members array with $user->team_members except the current user
        $user->team_members = $user->team->users->sortBy([['id','desc']])->where('id', '!=', $user->id)->values();
        // dd($user->team_members);
        return response()->success($user);
    }
}