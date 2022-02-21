<?php

namespace App\Repository;

use App\Entity\Loan;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Loan|null find($id, $lockMode = null, $lockVersion = null)
 * @method Loan|null findOneBy(array $criteria, array $orderBy = null)
 * @method Loan[]    findAll()
 * @method Loan[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LoanRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Loan::class);
    }

    /**
     * @return Loan[] Returns an array of Loan objects
     */
    public function searchLoans(?array $data = null){
        $em =$this->getEntityManager();
        $qb = $em->createQueryBuilder();

        $qb->select("l")
        ->from('App\Entity\Loan', 'l');

        if($data != null){
            $qb->join('l.book', 'b')
            ->join('l.user', 'u');

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
        $loans = $query->getResult();

        return $loans;
    }

    public function getTotalLoans($criteria = null)
    {
        $entityManager = $this->getEntityManager();
        $qb = $entityManager->createQueryBuilder();

        $qb->select('count(l.id)');
        $qb->from('App\Entity\Loan', 'l');

        if($criteria != null){
            $i = 1;
            foreach ($criteria as $key => $value) {
                if($i == 1){
                    $qb->where('l.'.$key . ' = ?' . $i);
                }else{
                    $qb->orWhere('l.'.$key . ' = ?' . $i);
                }
                $qb->setParameter($i, $value);
                $i++;
            }
        }

        $count = $qb->getQuery()->getSingleScalarResult();

        return $count;
    }

}
