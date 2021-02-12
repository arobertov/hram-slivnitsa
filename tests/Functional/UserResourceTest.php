<?php


namespace App\Tests\Functional;


use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

class UserResourceTest extends ApiTestCase
{

    public function testGetUsersWithautLogin()
    {
        $client = self::createClient();

        $client->request('POST', '/api/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'username'=>'stamat1',
                'alias'=>'         ',
                'email' => 'alabala@qw.hg',
                'password' => '1234567'
            ],
        ]);
        $this->assertResponseStatusCodeSame(401);
    }

}