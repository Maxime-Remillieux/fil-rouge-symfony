<?php

namespace App\Entity;

use App\Repository\PublisherRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

#[ORM\Entity(repositoryClass: PublisherRepository::class)]
class Publisher implements JsonSerializable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $name;

    #[ORM\OneToMany(mappedBy: 'publisher', targetEntity: Collec::class)]
    private $collecs;

    #[ORM\OneToMany(mappedBy: 'publisher', targetEntity: Book::class)]
    private $books;

    public function __construct()
    {
        $this->collecs = new ArrayCollection();
        $this->books = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Collec[]
     */
    public function getCollecs(): Collection
    {
        return $this->collecs;
    }

    public function addCollec(Collec $collec): self
    {
        if (!$this->collecs->contains($collec)) {
            $this->collecs[] = $collec;
            $collec->setPublisher($this);
        }

        return $this;
    }

    public function removeCollec(Collec $collec): self
    {
        if ($this->collecs->removeElement($collec)) {
            // set the owning side to null (unless already changed)
            if ($collec->getPublisher() === $this) {
                $collec->setPublisher(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Book[]
     */
    public function getBooks(): Collection
    {
        return $this->books;
    }

    public function addBook(Book $book): self
    {
        if (!$this->books->contains($book)) {
            $this->books[] = $book;
            $book->setPublisher($this);
        }

        return $this;
    }

    public function removeBook(Book $book): self
    {
        if ($this->books->removeElement($book)) {
            // set the owning side to null (unless already changed)
            if ($book->getPublisher() === $this) {
                $book->setPublisher(null);
            }
        }

        return $this;
    }

    public function jsonSerialize(): mixed
    {
        return $this->toArray();
    }

    public function toArray(){
        return array(
            'id' => $this->getId(),
            'name' => $this->getName()
        );
    }
}
