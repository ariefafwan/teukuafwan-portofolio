<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\ApiController;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use App\Traits\EnumTokenAbility;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends ApiController
{
    public function __construct(
        private readonly AuthService $service
    ) {}

    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return $this->errorResponse(message: 'Wrong credentials.');
        }

        $user = Auth::user();
        $tokens = $this->service->generateTokens($user);

        return $this->sendResponseWithTokens($tokens, [
            'user' => UserResource::make($user)
        ]);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $userData = $request->validated();

        try {
            $user = $this->service->doRegistration($userData);
        } catch (\Exception $exception) {
            return $this->errorResponse(message: $exception->getMessage());
        }

        $tokens = $this->service->generateTokens($user);

        return $this->sendResponseWithTokens($tokens, [
            'user' => UserResource::make($user)
        ]);
    }

    public function refresh(Request $request): JsonResponse
    {
        $refreshToken = $request->cookie('refreshToken');
        if (!$refreshToken) {
            return $this->unauthorized();
        }

        // Cari token di database
        $token = PersonalAccessToken::findToken($refreshToken);

        if (!$token || !$token->can(EnumTokenAbility::ISSUE_ACCESS_TOKEN->value)) {
            return $this->unauthorized();
        }

        $user = $token->tokenable;

        if (!$user) {
            return $this->unauthorized();
        }
        $user->tokens()->delete();

        // Generate token baru
        $tokens = $this->service->generateTokens($user);

        return $this->sendResponseWithTokens($tokens);
    }

    public function logout(Request $request): JsonResponse
    {
        if (Auth::check()) {
            $request->user()->tokens()->delete();
        }
        $cookie = cookie()->forget('refreshToken');

        return $this
            ->successResponse(message: 'Successfully logged out.')
            ->withCookie($cookie);
    }

    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        $dto = $request->validated();

        $status = $this->service->sendResetPasswordLink($dto['email']);

        if ($status === Password::RESET_LINK_SENT) {
            return $this->successResponse(message: __($status));
        }

        return $this->errorResponse(message: __($status));
    }

    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $status = $this->service->doPasswordReset($request->validated());

        if ($status === Password::PASSWORD_RESET) {
            return $this->successResponse(message: __($status));
        }

        return $this->errorResponse(message: __($status));
    }

    private function sendResponseWithTokens(array $tokens, $body = []): JsonResponse
    {
        $rtExpireTime = config('sanctum.rt_expiration');
        $cookie = cookie('refreshToken', $tokens['refreshToken'], $rtExpireTime, secure: false);

        return $this->successResponse(array_merge($body, [
            'accessToken' => $tokens['accessToken']
        ]))->withCookie($cookie);
    }
}
