<?php

namespace App\Repositories\User;

use Illuminate\Http\Request;

/**
 * Interface UserRepositoryInterface
 * @package App\Repositories\User
 */
interface UserRepositoryInterface
{
    /**
     * @param Request $request
     * @return mixed
     */
    public function register(Request $request);

    /**
     * @param Request $request
     * @return mixed
     */
    public function login(Request $request);

    /**
     * @param Request $request
     * @return mixed
     */
    public function refreshToken(Request $request);

    /**
     * @return mixed
     */
    public function details();

    /**
     * @param Request $request
     * @return mixed
     */
    public function logout(Request $request);

    /**
     * @param $data
     * @param int $statusCode
     * @return mixed
     */
    public function response($data, int $statusCode);

    /**
     * @param string $email
     * @param string $password
     * @return mixed
     */
    public function getTokenAndRefreshToken(string $email, string $password);

    /**
     * @param string $route
     * @param array $formParams
     * @return mixed
     */
    public function sendRequest(string $route, array $formParams);

    /**
     * @return mixed
     */
    public function getOClient();
}
