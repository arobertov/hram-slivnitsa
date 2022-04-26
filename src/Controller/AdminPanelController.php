<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class AdminPanelController
 * @package App\Controller
 */
class AdminPanelController extends AbstractController
{
    /**
     * @Route("/admin",name="admin_panel")
     * @Route("/admin/{vueRouting}",requirements={"vueRouting"="^(?!api).*"})
     * @param SerializerInterface $serializer
     * @return Response
     */
    public function index(SerializerInterface $serializer): Response
    {
        return $this->render('admin_panel/index-admin.html.twig', [
            'user' => $serializer->serialize($this->getUser(), 'jsonld')
        ]);
    }
}