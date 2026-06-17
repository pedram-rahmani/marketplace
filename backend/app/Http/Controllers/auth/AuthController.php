<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function registerUser(Request $request)
    {
        try {
            $this->validateRegistration($request);
        } catch (ValidationException $e) {
            return response()->json(['error_code' => 'VALIDATION_ERROR', 'errors' => $e->errors()], 422);
        }

        $user = $this->createUser($request);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token, 'message' => 'Success'], 201);
    }

    public function loginUser(Request $request)
    {
        $request->validate(['identifier' => 'required', 'password' => 'required']);

        $field = filter_var($request->identifier, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        $user = User::where($field, $request->identifier)->first();

        if (!$user) {
            return response()->json(['error_code' => 'USER_NOT_FOUND'], 404);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['error_code' => 'WRONG_PASSWORD'], 401);
        }

        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token, 'message' => 'Success'], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me(Request $request)
    {
        return response()->json(['user' => $request->user()]);
    }

    private function validateRegistration(Request $request)
    {
        return $request->validate([
            'name' => 'required|string|min:3|max:30',
            'username' => 'required|string|min:3|max:30|unique:users,username',
            'email' => 'required|email|max:38|unique:users,email',
            'password' => 'required|string|min:8|max:16|confirmed',
        ]);
    }

    private function createUser(Request $request)
    {
        $isFirstUser = User::count() === 0;
        return User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $isFirstUser ? 'admin' : 'user',
        ]);
    }
}
