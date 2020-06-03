<?php

namespace App\Repositories\User;

use App\User;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Client as OClient;
use GuzzleHttp\Exception\ClientException;
use App\Repositories\User\UserRepositoryInterface;

/**
 * Class UserRepository
 * @package App\Repositories\User
 */
class UserRepository implements UserRepositoryInterface
{
    /**
     *
     */
    const SUCCUSUS_STATUS_CODE = 200;
    /**
     *
     */
    const UNAUTHORISED_STATUS_CODE = 401;

    /**
     * @var Client
     */
    private $http;

    /**
     * UserRepository constructor.
     * @param Client $client
     */
    public function __construct(Client $client)
    {
        $this->http = $client;
    }

    /**
     * @param Request $request
     * @return array|mixed
     */
    public function register(Request $request)
    {
        $email = $request->get('email');
        $password = $request->get('password');
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        User::create($input);
        $response = $this->getTokenAndRefreshToken($email, $password);
        return $this->response($response["data"], $response["statusCode"]);
    }

    /**
     * @param Request $request
     * @return array|mixed
     */
    public function login(Request $request)
    {
        $email = $request->get('email');
        $password = $request->get('password');

        if (auth()->attempt(['email' => $email, 'password' => $password])) {
            $response = $this->getTokenAndRefreshToken($email, $password);
            $data = $response["data"];
            $statusCode = $response["statusCode"];
        } else {
            $data = ['error' => 'Unauthorised'];
            $statusCode = self::UNAUTHORISED_STATUS_CODE;
        }

        return $this->response($data, $statusCode);
    }

    /**
     * @param Request $request
     * @return mixed
     * @throws GuzzleException
     */
    public function refreshToken(Request $request)
    {
        if (is_null($request->header('Refreshtoken'))) {
            return $this->response(['error' => 'Unauthorised'], self::UNAUTHORISED_STATUS_CODE);
        }

        $refresh_token = $request->header('Refreshtoken');
        $Oclient = $this->getOClient();
        $formParams = [
            'grant_type' => 'refresh_token',
            'refresh_token' => $refresh_token,
            'client_id' => $Oclient->id,
            'client_secret' => $Oclient->secret,
            'scope' => '*'
        ];

        return $this->sendRequest(route('passport.token'), $formParams);
    }

    /**
     * @return array|mixed
     */
    public function details()
    {
        $user = auth()->user();
        return $this->response($user, self::SUCCUSUS_STATUS_CODE);
    }

    /**
     * @param Request $request
     * @return array|mixed
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return $this->response(['message' => 'Successfully logged out'], self::SUCCUSUS_STATUS_CODE);
    }

    /**
     * @param $data
     * @param int $statusCode
     * @return array|mixed
     */
    public function response($data, int $statusCode)
    {
        $response = ["data" => $data, "statusCode" => $statusCode];
        return $response;
    }

    /**
     * @param string $email
     * @param string $password
     * @return array|mixed
     * @throws GuzzleException
     */
    public function getTokenAndRefreshToken(string $email, string $password)
    {
        $Oclient = $this->getOClient();
        $formParams = [
            'grant_type' => 'password',
            'client_id' => $Oclient->id,
            'client_secret' => $Oclient->secret,
            'username' => $email,
            'password' => $password,
            'scope' => '*'
        ];

        return $this->sendRequest(route('passport.token'), $formParams);
    }

    /**
     * @param string $route
     * @param array $formParams
     * @return array|mixed
     * @throws GuzzleException
     */
    public function sendRequest(string $url, array $formParams)
    {
        try {
            $response = $this->http->request('POST', $url, ['form_params' => $formParams]);

            $statusCode = self::SUCCUSUS_STATUS_CODE;
            $data = json_decode((string)$response->getBody(), true);
        } catch (ClientException $e) {
            echo $e->getMessage();
            $statusCode = $e->getCode();
            $data = ['error' => 'OAuth client error'];
        }

        return ["data" => $data, "statusCode" => $statusCode];
    }

    /**
     * @return mixed
     */
    public function getOClient()
    {
        return OClient::where('password_client', 1)->first();
    }
}
