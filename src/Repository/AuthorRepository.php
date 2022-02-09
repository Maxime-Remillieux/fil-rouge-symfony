<?php

namespace App\Repository;

use App\Entity\Author;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Author|null find($id, $lockMode = null, $lockVersion = null)
 * @method Author|null findOneBy(array $criteria, array $orderBy = null)
 * @method Author[]    findAll()
 * @method Author[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AuthorRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Author::class);
    }

    /**
     * @return Author[] Returns an array of Author objects
     */
    public function searchAuthors(?array $data = null){
        $em = $this->getEntityManager();
        $qb = $em->createQueryBuilder();
        $qb->select('a')
        ->from('App\Entity\Author', 'a');

        if($data != null){
            $i = 1;
            foreach ($data as $key => $value) {
                if($i == 1){
                    $qb->where($key . ' like ?' . $i);
                }else{
                    $qb->andWhere($key . ' like ?' . $i);
                }
                $qb->setParameter($i, '%' . $value . '%');
                $i++;
            }
        }
        $query = $qb->getQuery();
        $authors = $query->getResult();

        return $authors;
    }

    // /**
    //  * @return Author[] Returns an array of Author objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Author
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
