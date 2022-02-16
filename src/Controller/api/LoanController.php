<?php

namespace App\Controller\api;

use Exception;
use App\Entity\Loan;
use App\Entity\User;
use DateTimeImmutable;
use App\Service\ResponseManager;
use App\Repository\BookRepository;
use App\Repository\LoanRepository;
use App\Repository\UserRepository;
use App\Service\ErrorManager;
use App\Service\MessageManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/loan')]
class LoanController extends AbstractController
{
    private ResponseManager $rm;

    public function __construct(ResponseManager $rm){
        $this->rm = $rm;
    }

    #[Route('/', name: 'loan.list')]
    public function getLoans(LoanRepository $repo, Request $req): Response
    {
        $data = $req->toArray();
        $loans = $repo->searchLoans($data);

        return $this->rm->sendJSON($loans);
    }

    #[Route('/new', name: 'loan.new')]
    public function new(Request $req, EntityManagerInterface $em, BookRepository $bookRepo, UserRepository $userRepo): Response
    {
        $data = json_decode($req->request->get('data'));
        $loan = new Loan();
        try{
            $book = $bookRepo->find($data['book']);
            $user = $userRepo->find($data['user']);
            $loan->setBook($book);
            $loan->setUser($user);
            $now = new DateTimeImmutable("now");
            $loan->setCreateAt($now);
            $returnDate = $this->getReturnDate($now, $user);
            $loan->setReturnAt($returnDate);
            $loan->setStatus('En cours');
            $em->persist($loan);
            $em->flush();

            return $this->rm->sendCreateResponse(true);
        } catch(Exception $e){
            return $this->rm->sendCreateResponse(false, $e);
        }
    }

    private function getReturnDate(DateTimeImmutable $date, User $user){
        $userRoles = $user->getRoles();
        if(in_array('ROLE_PROF', $userRoles)){
            $loanTimeDays = '21';
        }else{
            $loanTimeDays = '14';
        }
        $end = $date->modify('+'.$loanTimeDays.' day');//10 jours plus tard
        $end->setTime(0,0,0);//on passe l'horaire a 00:00:00
        return $end;
    }
}
