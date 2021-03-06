<?php

namespace App\Controller\Api;

// use App\Entity\User;
use Exception;
use App\Entity\User;
use DateTimeImmutable;
// use Doctrine\ORM\EntityManager;
use App\Service\ResponseManager;
use Symfony\Component\Mime\Email;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/user')]
class UserController extends AbstractController
{
    private ResponseManager $rm;

    public function __construct(ResponseManager $rm){
        $this->rm = $rm;
    }
    
    #[Route('/', name: 'user')]
    public function getUsers(UserRepository $repo, Request $req): Response
    {
        $data = $req->toArray();
        $users = $repo->searchUsers($data);
        return $this->rm->sendJSON($users);
    }

    #[Route('/show/{id}', name: 'user.show')]
    public function show(User $user): Response
    {
        return $this->rm->sendJSON([$user]);
    }

    #[Route('/new', name: 'user.new', methods:['POST'])]
    public function new(Request $req, UserRepository $repo, EntityManagerInterface $em, MailerInterface $mailer): Response
    {
        // $data = $req->toArray();
        $data = json_decode($req->request->get('data'), true);
        $user = new User();
        $user->setName($data['name']);
        $user->setFirstname($data['firstname']);
        $user->setCode($this->generateCode($data['name'], $data['firstname'], $repo));
        $clearPass = $this->generatePassword();
        $user->setPassword(password_hash($clearPass, PASSWORD_DEFAULT));
        $user->setAdress($data['adress']);
        $user->setPostCode($data['post_code']);
        $user->setCity($data['city']);
        $user->setPhone($data['phone']);
        $user->setEmail($data['email']);
        $user->setRoles([$data['role']]);
        $user->setRegisteredAt(new DateTimeImmutable("now"));

        try{
            $em->persist($user);
            $em->flush();
            $this->sendMail($user, $clearPass, $mailer);
            return $this->rm->sendCreateResponse(true);
        }catch(Exception $e){
            return $this->rm->sendCreateResponse(false, $e);
        }
    }

    private function sendMail(User $user, string $pass, MailerInterface $mailer){
        $email = (new Email())
        ->from('noreply@gmail.com')
        ->to($user->getEmail())
        //->cc('cc@example.com')
        //->bcc('bcc@example.com')
        //->replyTo('fabien@example.com')
        //->priority(Email::PRIORITY_HIGH)
        ->subject('Cr??ation de votre compte')
        // ->text()
        ->html("<h1>Bonjour {$user->getFirstname()} Votre compte ?? bien ??t?? cr???? </h1></br><p>Voici votre mot de passe provisoire, veuillez le modifier ?? votre premi??re connection : $pass</p>");

        $mailer->send($email);
    }

    private function generatePassword(){
        $password = '';
        for ($i=0; $i < 10; $i++) { 
            $password .= rand(0, 9);
        }
        return $password;
    }

    //g??n??re les codes des livres et utilisateurs
    private function generateCode(string $a, string $b, UserRepository $repo){
        do{
            $code = strtoupper(substr($a, 0, 3)).strtoupper(substr($b, 0, 3)).$this->formatNumber(rand(1, 999), 3);
            $codeTestUser = $repo->findOneBy(['code' => $code]);
        }while($codeTestUser != null);
        return $code;
    }

    function formatNumber($n, $size){
        $n = strval($n);
        while(strlen($n) < $size){
            $n = '0'.$n;
        }
        return $n;
    }
}
