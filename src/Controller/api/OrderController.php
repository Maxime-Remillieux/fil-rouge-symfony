<?php

namespace App\Controller\Api;

use Exception;
use App\Entity\Loan;
use App\Entity\User;
use App\Entity\Order;
use DateTimeImmutable;
use App\Service\ResponseManager;
use Symfony\Component\Mime\Email;
use App\Repository\BookRepository;
use App\Repository\UserRepository;
use App\Repository\OrderRepository;
use App\Service\DataService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Knp\Snappy\Pdf;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class OrderController extends AbstractController
{
    private EntityManagerInterface $em; 
    private ResponseManager $rm;
    private Pdf $pdf;
    private ParameterBagInterface $params;
    private MailerInterface $mailer;
    
    public function __construct(EntityManagerInterface $em, ResponseManager $rm, Pdf $pdf, ParameterBagInterface $params, MailerInterface $mailer)
    {
        $this->em = $em;
        $this->rm = $rm;
        $this->pdf = $pdf;
        $this->params = $params;
        $this->mailer = $mailer;
    }

    #[Route('/api/order/', name: 'order')]
    public function list(OrderRepository $repo, Request $req): Response{
        $reqData = $req->toArray();
        $orders = $repo->searchOrders($reqData);
        return $this->rm->sendJSON($orders);
    }

    #[Route('/api/order/out/{id}', name: 'order.out')]
    public function process(Order $order): Response{
        try{
            $this->setOrderStatus($order, 'out');
            return $this->rm->updateResponse('update');
        }catch(Exception $err){
            return $this->rm->updateResponse('update', $err);
        }
    }

    private function setOrderStatus(Order $order, string $status){
        $loans = $order->getLoans();
        foreach ($loans as $loan) {
            $loan->setStatus($status);
        }
        $order->setStatus($status);
        $this->em->flush();
    }

    #[Route('/api/order/return/{id}', name: 'order.return')]
    public function returnOrder(Order $order){
        try{
            $this->setOrderStatus($order, 'ended');
            return $this->rm->updateResponse('update');
        }catch(Exception $err){
            return $this->rm->updateResponse('update', $err);
        }
    }
    #[Route('/api/order/cancel/{id}', name: 'order.cancel')]
    public function cancelOrder(Order $order){
        try{
            $this->setOrderStatus($order, 'cancelled');
            return $this->rm->updateResponse('update');
        }catch(Exception $err){
            return $this->rm->updateResponse('update', $err);
        }
    }

    #[Route('/api/order/new', name: 'order.new')]
    public function new(Request $req, BookRepository $bookRepo, UserRepository $userRepo): Response
    {
        $data = $req->toArray();
        $books = $data['books'];
        foreach ($books as $book) {
            if(!$book->isAvailable()){
                $debugMessage = "Ce livre n'est plus disponible: " . $book['title'] . ' - ' . $book['author']['firstname'] . ' ' . $book['author']['name'];
                return $this->rm->updateResponse('newOrder', new Exception($debugMessage));
            }
        }
        $userId = $data['user']['id'];
        $now = new DateTimeImmutable('now');
        $data['date'] = $now->format('Y-m-d');
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
            $this->sendMail($user, $data);
            return $this->rm->newOrderResponse(true);
        } catch(Exception $e){
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
        $end = $date->modify('+'.$loanTimeDays.' day');//n jours plus tard
        $end->setTime(0,0,0);//on passe l'horaire a 00:00:00
        return $end;
    }
    
    private function createPdf($data){
        $fileName = 'order_summary'.uniqid().'.pdf';
        $projectRoot = $this->params->get('kernel.project_dir');

        $html = $this->renderView(
            '/order/order_pdf.html.twig',
            array(
                'data'  => $data
            )
        );
        $this->pdf->setTimeout(120);
        $this->pdf->setOption('enable-local-file-access', true);

        $path = "$projectRoot\\pdf\\$fileName";

        $this->pdf->generateFromHtml($html, $path);

        return $path;
    }

    private function sendMail(User $user, $data){
        $pdf = $this->createPdf($data);
        $email = (new Email())
        ->from('noreply@gmail.com')
        ->to($user->getEmail())
        //->cc('cc@example.com')
        //->bcc('bcc@example.com')
        //->replyTo('fabien@example.com')
        //->priority(Email::PRIORITY_HIGH)
        ->subject('Votre réservation')
        ->attachFromPath($pdf)
        // ->text()
        ->html("<h1>Bonjour {$user->getFirstname()}, <p>Votre réservation a bien été prise en compte, veuillez trouver ci-joint un récapitulatif de votre commande.</p>");

        $this->mailer->send($email);
    }
}
