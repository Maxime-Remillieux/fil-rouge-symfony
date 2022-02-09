<?php

namespace App\Controller\api;

use Exception;
use App\Entity\Book;
use App\Entity\Theme;
use App\Entity\Author;
use App\Entity\Collec;
use DateTimeImmutable;
use App\Entity\Publisher;
use Doctrine\ORM\EntityManager;
use App\Repository\BookRepository;
use App\Repository\ThemeRepository;
use App\Repository\AuthorRepository;
use App\Repository\CollecRepository;
use App\Repository\PublisherRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/book')]
class BookController extends AbstractController
{
    #[Route('/', name: 'book')]
    public function getBooks(BookRepository $repo, Request $req): Response
    {
        $data = $req->toArray();
        $books = $repo->searchBooks($data);
        return $this->sendResponse(json_encode($books));
    }

    #[Route('/show/{id}', name: 'book.show')]
    public function show(Book $book): Response
    {
        return $this->sendResponse(json_encode($book));
    }

    #[Route('/new', name: 'book.new', methods:['POST'])]
    public function new(Request $req, BookRepository $repo, AuthorRepository $authorRepo, PublisherRepository $publisherRepo, CollecRepository $collecRepo, ThemeRepository $themeRepo, EntityManagerInterface $em): Response
    {
        /** @var UploadedFile $img */
        $img = $req->files->get('img');
        // dump($img);
        $destination = $this->getParameter('kernel.project_dir').'/public/upload/books';
        $imgName = uniqid().'.'.$img->getClientOriginalExtension();
        $img->move($destination, $imgName);
        
        // $data = $req->toArray();
        $data = json_decode($req->request->get('data'), true);

        $book = new Book();
        $book->setTitle($data['title']);
        if($data['author']['id'] == 0){
            $author = new Author();
            $author->setName($data['author']['name']);
            $author->setFirstname($data['author']['firstname']);

            $em->persist($author);
            $em->flush();
        }else{
            $author = $authorRepo->find($data['author']['id']);
        }

        $book->setAuthor($author);

        if($data['publisher']['id'] == 0){
            $publisher = new Publisher();
            $publisher->setName($data['publisher']['name']);

            $em->persist($publisher);
            $em->flush();
        }else{
            $publisher = $publisherRepo->find($data['publisher']['id']);
        }

        $book->setPublisher($publisher);

        if($data['collection']['id'] == 0){
            $collection = new Collec();
            $collection->setName($data['collection']['name']);
            $collection->setPublisher($publisher);

            $em->persist($collection);
            $em->flush();
        }else{
            $collection = $collecRepo->find($data['collection']['id']);
        }
        $book->setCollection($collection);

        foreach ($data['themes'] as $themeData) {
            if($themeData['id'] == 0){
                $theme = new Theme();
                $theme->setName($themeData['name']);
                $em->persist($theme);
                $em->flush();
            }else{
                $theme = $themeRepo->find($themeData['id']);
            }
            $book->addTheme($theme);
        }
        $book->setCode($this->generateCode($data['publisher']['name'], $data["collection"]['name'], $repo));
        $book->setAddedAt(new DateTimeImmutable("now"));
        $book->setReleaseAt(new DateTimeImmutable($data['release_at']));
        $book->setImg($imgName);
        $book->setResume($data['resume']);

        // $em->persist($book);
        // $em->flush();
        try{
            $em->persist($book);
            $em->flush();
            return $this->sendResponse(json_encode(['status'=> "OK", 'message'=> 'BOOK ADDED SUCCESSFULLY']));
        }catch(Exception $e){
            return $this->sendResponse(json_encode(['status'=> "ERROR", 'message'=>$e->getMessage()]));
        }

        return $this->sendResponse(json_encode($book));
    }

    public function sendResponse($content): Response{
        $resp = new Response();
        $resp->setContent($content);
        $resp->setStatusCode(Response::HTTP_OK);

        // sets a HTTP response header
        $resp->headers->set('Content-Type', 'application/json');
        return $resp;
    }

    //génère les codes des livres et utilisateurs
    private function generateCode(string $a, string $b, BookRepository $repo){
        do{
            $code = strtoupper(substr($a, 0, 3)).strtoupper(substr($b, 0, 3)).$this->formatNumber(rand(1, 999), 3);
            $codeTestbook = $repo->findOneBy(['code' => $code]);
        }while($codeTestbook != null);
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
