<?php


namespace App\Tests\Functional;


use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;

class UserResourceTest extends ApiTestCase
{

    public function testCreateCheeseListing()
    {
        $client = self::createClient();
        //$container = $client->getContainer();
        $client->request('POST', '/api/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'username'=>'stamat',
                'alias'=>'Stamat',
                'email' => 'cheeseplease@example.com',
                'password' => '123456'
            ],
        ]);
        $this->assertResponseStatusCodeSame(201);
    }
}