<?php

namespace App\Controller\api;

use Exception;
use App\Entity\Publisher;
use App\Service\ResponseManager;
use App\Repository\PublisherRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/publisher')]
class PublisherController extends AbstractController
{
    private ResponseManager $rm;

    public function __construct(ResponseManager $rm){
        $this->rm = $rm;
    }
    
    #[Route('/', name: 'publisher')]
    public function index(PublisherRepository $repo, Request $req): Response
    {
        // $data = json_decode($req);
        $data = json_decode($req->request->get('data'), true);
        $publishers = $repo->findBy($data);
        return $this->rm->sendJSON($publishers);
    }

    #[Route('/new', name: 'publisher.new')]
    public function new(Request $req, EntityManagerInterface $em): Response {
        $data = json_decode($req->request->get('data'), true);
        $publisher = new Publisher();
        $publisher->setName($data['name']);

        try{
            $em->persist($publisher);
            $em->flush();
            return $this->rm->sendCreateResponse(true);
        }catch(Exception $e){
            return $this->rm->sendCreateResponse(false, $e);
        }
        
    }

}
