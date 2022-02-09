<?php

namespace App\Controller\api;

use App\Repository\LoanRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/loan')]
class LoanController extends AbstractController
{
    #[Route('/', name: 'loan.list')]
    public function getLoans(LoanRepository $repo, Request $req): Response
    {
        $data = $req->toArray();
        $loans = $repo->searchLoans($data);

        $resp = new Response();
        $resp->setContent(json_encode($loans));
        $resp->setStatusCode(Response::HTTP_OK);
        // sets a HTTP response header
        $resp->headers->set('Content-Type', 'application/json');
        return $resp;    
    }
}
