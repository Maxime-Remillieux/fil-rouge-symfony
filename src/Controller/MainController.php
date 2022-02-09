<?php

namespace App\Controller;

use App\Entity\User;
use DateTimeImmutable;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class MainController extends AbstractController {

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

    #[Route('/parcourir', name:'parcourir')]
    function parcourir(): Response {
        return $this->render('/parcourir.html.twig');
    }
    // #[Route('/test', name:"test")]
    // function test(UserRepository $userRepo, EntityManagerInterface $em): Response{
    //     $user = new User();
    //     $user->setName('testName');
    //     $user->setFirstname('testFName');
    //     $user->setCode($this->generateCode('Boby', 'Bob', $userRepo));
    //     $user->setPassword($this->generatePassword());
    //     $user->setAdress("13 avenue Gambetta");
    //     $user->setPostCode('94600');
    //     $user->setCity('Choisy-le-Roi');
    //     $user->setPhone("0638965425");
    //     $user->setEmail("boby@boby.com");
    //     $user->setRoles(['ROLE_USER']);
    //     $user->setRegisteredAt(new DateTimeImmutable("now"));

    //     $em->persist($user);
    //     $em->flush();
    //     return $this->render('/test.html.twig', ['user'=>$user]);
    // }
    
    // #[Route('/test2', name:"test2")]
    // function test2(UserRepository $userRepo, EntityManagerInterface $em): Response{
    //     $user = new User();
    //     $em->persist($user);
    //     $em->flush();
    //     return $this->render('/test.html.twig', ['user'=>$user]);
    // }

    // private function generatePassword(){
    //     $password = '';
    //     for ($i=0; $i < 10; $i++) { 
    //         $password .= rand(0, 9);
    //     }
    //     return password_hash($password, PASSWORD_DEFAULT);
    // }

    // //génère les codes des livres et utilisateurs
    // private function generateCode(string $a, string $b, UserRepository $repo){
    //     do{
    //         $code = strtoupper(substr($a, 0, 3)).strtoupper(substr($b, 0, 3)).$this->formatNumber(rand(1, 999), 3);
    //         $codeTestUser = $repo->findOneBy(['code' => $code]);
    //         dump($codeTestUser);
    //     }while($codeTestUser != null);
    //     return $code;
    // }

    // function formatNumber($n, $size){
    //     $n = strval($n);
    //     while(strlen($n) < $size){
    //         $n = '0'.$n;
    //     }
    //     return $n;
    // }
}