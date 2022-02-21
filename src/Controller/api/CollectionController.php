<?php

namespace App\Controller\Api;

use App\Entity\Collec;
use App\Repository\CollecRepository;
use App\Service\ResponseManager;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('api/collection')]
class CollectionController extends AbstractController
{
    private ResponseManager $rm;

    public function __construct(ResponseManager $rm){
        $this->rm = $rm;
    }
    
    #[Route('/', name: 'collection')]
    public function index(Request $req, CollecRepository $repo): Response
    {
        $data = $req->toArray('data');
        $collections = $repo->findBy($data);
        return $this->rm->sendJSON($collections);
    }

    #[Route('/new', name: 'collec.new')]
    public function new(Request $req, EntityManagerInterface $em): Response{
        
        $data = json_decode($req->request->get('data'), true);
        $collec = new Collec();
        $collec->setName($data['name']);

        try{
            $em->persist($collec);
            $em->flush();
            return $this->rm->sendCreateResponse(true);
        }catch(Exception $e){
            return $this->rm->sendCreateResponse(false, $e);
        }
    }
}
