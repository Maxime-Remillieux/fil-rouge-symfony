<?php

namespace App\Repository;

use App\Entity\Order;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Order|null find($id, $lockMode = null, $lockVersion = null)
 * @method Order|null findOneBy(array $criteria, array $orderBy = null)
 * @method Order[]    findAll()
 * @method Order[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OrderRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Order::class);
    }

    /**
     * @return Order[] Returns an array of Order objects
     */
    public function searchOrders($data = null){
        $em = $this->getEntityManager();
        $qb = $em->createQueryBuilder();
        $qb->select('o')
        ->from('App\Entity\Order', 'o');

        if($data != null){
            $qb->join('o.user', 'u')
            ->join('o.loans', 'l')
            ->join('l.book', 'b');
            
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
        $orders = $query->getResult();

        return $orders;
    }
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('o.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Order
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
