<?php

namespace App\Controller\Api;

use Exception;
use App\Entity\Theme;
use App\Service\ResponseManager;
use App\Repository\ThemeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/theme')]
class ThemeController extends AbstractController
{
    private ResponseManager $rm;

    public function __construct(ResponseManager $rm){
        $this->rm = $rm;
    }
    
    #[Route('/', name: 'theme')]
    public function index(ThemeRepository $repo, Request $req): Response
    {
        // $data = json_decode($req);
        $data = json_decode($req->request->get('data'), true);
        $authors = $repo->searchAuthors($data);
        return $this->rm->sendJSON($authors);
    }

    #[Route('/new', name: 'theme.new')]
    public function new(Request $req, EntityManagerInterface $em): Response{
        
        $data = json_decode($req->request->get('data'), true);
        $theme = new Theme();
        $theme->setName($data['name']);

        try{
            $em->persist($theme);
            $em->flush();
            return $this->rm->sendCreateResponse(true);
        }catch(Exception $e){
            return $this->rm->sendCreateResponse(false, $e);
        }
    }

}