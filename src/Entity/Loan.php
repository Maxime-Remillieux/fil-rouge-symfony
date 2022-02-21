<?php

namespace App\Entity;

use App\Repository\LoanRepository;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

#[ORM\Entity(repositoryClass: LoanRepository::class)]

class Loan implements JsonSerializable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(inversedBy: 'loans', targetEntity: Book::class, cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private $book;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'loans')]
    #[ORM\JoinColumn(nullable: false)]
    private $user;

    #[ORM\Column(type: 'string', length: 255)]
    private $status;

    #[ORM\Column(type: 'datetime_immutable')]
    private $create_at;

    #[ORM\Column(type: 'datetime_immutable')]
    private $return_at;

    #[ORM\ManyToOne(targetEntity: Order::class, inversedBy: 'loans')]
    private $current_order;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBook(): ?Book
    {
        return $this->book;
    }

    public function setBook(Book $book): self
    {
        $this->book = $book;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function toArray()
    {
        return array(
            'id' => $this->getId(),
            'status' => $this->getStatus(),
            'user' => $this->getUser(),
            'book' => $this->getBook(),
            'orderId' => $this->getCurrentOrder()->getId(),
            'createdAt' => $this->getCreateAt()->format('Y-m-d'),
            'returnAt' => $this->getReturnAt()->format('Y-m-d'),
            'isLate' => $this->isLate()
        );
    }

    public function jsonSerialize(): mixed
    {
        return $this->toArray();
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCreateAt(): ?\DateTimeImmutable
    {
        return $this->create_at;
    }

    public function setCreateAt(\DateTimeImmutable $create_at): self
    {
        $this->create_at = $create_at;

        return $this;
    }

    public function getReturnAt(): ?\DateTimeImmutable
    {
        return $this->return_at;
    }

    public function setReturnAt(\DateTimeImmutable $return_at): self
    {
        $this->return_at = $return_at;

        return $this;
    }

    public function getCurrentOrder(): ?Order
    {
        return $this->current_order;
    }

    public function setCurrentOrder(?Order $current_order): self
    {
        $this->current_order = $current_order;

        return $this;
    }

    public function isActive(){
        $status = $this->getStatus();
        if($status === "reserved" || $status === 'out'){
            return true;
        }
        return false;
    }

    public function isLate(){
        $now = new DateTimeImmutable('now');
        if($this->isActive() && $this->getReturnAt() < $now){
            return true;
        }
        return false;
    }
}
