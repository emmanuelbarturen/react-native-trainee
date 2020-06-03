<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Repositories\User\UserRepositoryInterface;

/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    /**
     * @var UserRepositoryInterface
     */
    private $userRepository;

    /**
     * UserController constructor.
     * @param UserRepositoryInterface $userRepository
     */
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @param UserLoginRequest $request
     * @return JsonResponse
     */
    public function login(UserLoginRequest $request)
    {
        $response = $this->userRepository->login($request);
        return response()->json($response["data"], $response["statusCode"]);
    }

    /**
     * @param UserRegisterRequest $request
     * @return JsonResponse
     */
    public function register(UserRegisterRequest $request)
    {
        $response = $this->userRepository->register($request);
        return response()->json($response["data"], $response["statusCode"]);
    }

    /**
     * @return JsonResponse
     */
    public function details()
    {
        $response = $this->userRepository->details();
        return response()->json($response["data"], $response["statusCode"]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request)
    {
        $response = $this->userRepository->logout($request);
        return response()->json($response["data"], $response["statusCode"]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function refreshToken(Request $request)
    {
        $response = $this->userRepository->refreshToken($request);
        return response()->json($response["data"], $response["statusCode"]);
    }
}

