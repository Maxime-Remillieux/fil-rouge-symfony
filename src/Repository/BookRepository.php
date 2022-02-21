<?php

namespace App\Repository;

use App\Entity\Book;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Book|null find($id, $lockMode = null, $lockVersion = null)
 * @method Book|null findOneBy(array $criteria, array $orderBy = null)
 * @method Book[]    findAll()
 * @method Book[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Book::class);
    }

    /**
    * @return Book[] Returns an array of Book objects
    */
    public function searchBooks(?array $data = null) {
        $em = $this->getEntityManager();
        $qb = $em->createQueryBuilder();
        $qb->select('b')
        ->from('App\Entity\Book', 'b');

        if($data != null){
            $qb->join('b.author', 'a')
            ->join('b.publisher', 'p')
            ->join('b.collection', 'c')
            ->join('b.themes', 't');
            $i = 1;
            foreach ($data as $key => $value) {
                if($i == 1){
                    $qb->where($key . ' like ?' . $i);
                }else{
                    $qb->orWhere($key . ' like ?' . $i);
                }
                $qb->setParameter($i, '%' . $value . '%');
                $i++;
            }
        }

        $query = $qb->getQuery();
        $livres = $query->getResult();

        return $livres;
    }

    public function getTotalBooks()
    {
        $entityManager = $this->getEntityManager();
        $qb = $entityManager->createQueryBuilder();

        $qb->select('count(book.id)');
        $qb->from('App\Entity\Book', 'book');

        $count = $qb->getQuery()->getSingleScalarResult();

        return $count;
    }
}
