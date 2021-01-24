<?php

namespace App\Controller;

use ApiPlatform\Core\Api\IriConverterInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Http\RememberMe\RememberMeServicesInterface;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login", methods={"POST"})
     * @param IriConverterInterface $iriConverter
     * @param TokenStorageInterface $tokenStorage
     * @param RememberMeServicesInterface $rememberMeService
     * @param Request $request
     * @return Response
     * @throws Exception
     */
    public function login(
        IriConverterInterface $iriConverter,
        TokenStorageInterface $tokenStorage,
        RememberMeServicesInterface $rememberMeService,
        Request $request
    ):Response
    {
        return new Response(null, 204, [
            'Location' => $iriConverter->getIriFromItem($this->getUser())
        ]);
        /*
        // Capture the JSON Payload posted from the client
        $payload = [];
        if( $request->getContentType() === 'json' ) {
            $payload = json_decode($request->getContent(), true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception('Invalid json: ' . json_last_error_msg() );
            }
        }

        // Look for the "_remember_me" form field and cast it to a Boolean
        $rememberMe = isset($payload['_remember_me'])
            ? filter_var( $payload['_remember_me'], FILTER_VALIDATE_BOOLEAN )
            : false;
        // Set the remember me token
        dump($rememberMe);
        if( $rememberMe ){
            $securityToken = $tokenStorage->getToken();
            $rememberMeService->loginSuccess(
                $request,
                $response,
                $securityToken
            );
        }
        */
    }

    /**
     * @Route("/logout", name="app_logout")
     * @throws Exception
     */
    public function logout(): void
    {
        throw new \RuntimeException('This method can be blank - it will be intercepted by the logout key on your firewall');
    }
}
