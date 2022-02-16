<?php

namespace App\Controller\api;

use Exception;
use App\Entity\Author;
use App\Service\ResponseManager;
use App\Repository\AuthorRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/author')]
class AuthorController extends AbstractController
{
    private ResponseManager $rm;

    public function __construct(ResponseManager $rm){
        $this->rm = $rm;
    }
    
    #[Route('/', name: 'author')]
    public function index(AuthorRepository $repo, Request $req): Response
    {
        // $data = json_decode($req);
        $data = json_decode($req->request->get('data'), true);
        $authors = $repo->searchAuthors($data);
        return $this->rm->sendJSON($authors);
    }

    #[Route('/new', name: 'author.new')]
    public function new(Request $req, EntityManagerInterface $em): Response{
        $data = json_decode($req->request->get('data'), true);
        $author = new Author();
        $author->setName($data['name']);
        $author->setFirstname($data['firstname']);

        try{
            $em->persist($author);
            $em->flush();
            return $this->rm->sendCreateResponse(true);
        }catch(Exception $e){
            return $this->rm->sendCreateResponse(false, $e);
        }
        
    }

}
