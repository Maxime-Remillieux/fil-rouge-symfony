<?php
namespace App\Service;

use App\Entity\Book;
use App\Repository\BookRepository;
use App\Repository\LoanRepository;
use App\Repository\UserRepository;
use App\Repository\OrderRepository;

class DataService {
    private UserRepository $userRepo;
    private BookRepository $bookRepo;
    private OrderRepository $orderRepo;
    private LoanRepository $loanRepo;

    public function __construct(UserRepository $userRepo, BookRepository $bookRepo, OrderRepository $orderRepo, LoanRepository $loanRepo){
        $this->userRepo = $userRepo;
        $this->bookRepo = $bookRepo;
        $this->orderRepo = $orderRepo;
        $this->loanRepo = $loanRepo;
    }

    public function getStats(){

        $stats = [
            "users" => [
                "total" => $this->userRepo->getTotalUsers(),
                "students" => $this->userRepo->getTotalUsersByRole('ROLE_STUDENT'),
                "profs" => $this->userRepo->getTotalUsersByRole('ROLE_PROF'),
                "admins" => $this->userRepo->getTotalUsersByRole('ROLE_ADMIN'),
            ],
            "books" => [
                "total" => $this->bookRepo->getTotalBooks(),
                "reserved" => $this->loanRepo->getTotalLoans(["status"=>"reserved"]),
                "out" => $this->loanRepo->getTotalLoans(["status"=>"out"]),
            ],
            "loans" => [
                "total" => $this->loanRepo->getTotalLoans(),
                "ended" => $this->loanRepo->getTotalLoans(["status" => "ended"]),
            ],
            "orders" => [
                "total" => $this->orderRepo->getTotalOrders(),
                "reserved" => $this->orderRepo->getTotalOrders(["status"=>"reserved"]),
                "out" => $this->orderRepo->getTotalOrders(["status"=>"out"]),
                "ended" => $this->orderRepo->getTotalOrders(["status"=>"ended"]),
                "cancelled" => $this->orderRepo->getTotalOrders(["status"=>"cancelled"])
            ]
        ];

        $stats['books']['available'] = $stats['books']['total'] - $stats['books']['out'] - $stats['books']['reserved'];

        return $stats;
    }
}