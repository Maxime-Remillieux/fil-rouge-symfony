<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ThemeRepository;
use DateTimeImmutable;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;

class MainController extends AbstractController {

    private Security $security;

    public function __construct(Security $security)
    {   
        $this->security = $security;
    }

    #[Route('/', name:"home")]
    function home(): Response {
        return $this->render('/home.html.twig');
    }
    #[Route('/gestion/{entity}', name:"gestion")]
    function gestion(): Response {
        return $this->render('/gestion.html.twig');
    }
    #[Route('/gestion/{entity}/new', name:"gestionNew")]
    function new(): Response {
        return $this->render('/gestion.html.twig');
    }
    #[Route('/parcourir/{id}', name:"parcourir.show")]
    function show(ThemeRepository $themeRepo): Response {
        $themes = $themeRepo->findAll();
        $user = $this->security->getUser();

        return $this->render('/parcourir.html.twig', [
            "themes" => json_encode($themes),
            "user" => json_encode($user)
        ]);
    }

    #[Route('/parcourir', name:'parcourir')]
    function parcourir(ThemeRepository $themeRepo): Response {
        $themes = $themeRepo->findAll();
        $user = $this->security->getUser();

        return $this->render('/parcourir.html.twig', [
            "themes"=> json_encode($themes),
            "user"=> json_encode($user)
        ]);
    }
}