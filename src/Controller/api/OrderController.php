<?php

namespace App\Controller\api;

use App\Entity\Loan;
use App\Entity\Order;
use App\Entity\User;
use DateTimeImmutable;
use App\Service\ResponseManager;
use App\Repository\BookRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class OrderController extends AbstractController
{
    private EntityManagerInterface $em; 
    private ResponseManager $rm; 
    
    public function __construct(EntityManagerInterface $em, ResponseManager $rm)
    {
        $this->em = $em;
        $this->rm = $rm;
    }

    #[Route('/api/order/new', name: 'order.new')]
    public function new(Request $req, BookRepository $bookRepo, UserRepository $userRepo): Response
    {
        $data = $req->toArray();
        $books = $data['books'];
        $userId = $data['user']['id'];
        $now = new DateTimeImmutable('now');
        $user = $userRepo->find($userId);

        $order = new Order();
        $order->setUser($user);
        $order->setCreatedAt($now);
        $order->setStatus('reserved');
        $this->em->persist($order);
        $this->em->flush();

        try{
            foreach ($books as $book) {
                $loan = new Loan();
                $loan->setCurrentOrder($order);
                $loan->setUser($user);
                $loan->setBook($bookRepo->find($book['id']));
                $loan->setStatus('reserved');
                $loan->setCreateAt($now);
                $loan->setReturnAt($this->getReturnDate($now, $user));
                $this->em->persist($loan);
                $this->em->flush();
            }

            return $this->rm->newOrderResponse(true);
        }catch(Exception $e){
            return $this->rm->newOrderResponse(false, $e);
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
