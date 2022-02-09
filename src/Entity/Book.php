<?php

namespace App\Entity;

use App\Repository\BookRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

#[ORM\Entity(repositoryClass: BookRepository::class)]
class Book implements JsonSerializable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $code;

    #[ORM\Column(type: 'string', length: 255)]
    private $title;

    #[ORM\Column(type: 'datetime_immutable')]
    private $release_at;

    #[ORM\Column(type: 'datetime_immutable')]
    private $added_at;

    #[ORM\Column(type: 'string', length: 255)]
    private $img;

    #[ORM\Column(type: 'text')]
    private $resume;

    #[ORM\ManyToOne(targetEntity: Author::class, inversedBy: 'books')]
    #[ORM\JoinColumn(nullable: false)]
    private $author;

    #[ORM\ManyToOne(targetEntity: Publisher::class, inversedBy: 'books')]
    #[ORM\JoinColumn(nullable: false)]
    private $publisher;

    #[ORM\ManyToOne(targetEntity: Collec::class, inversedBy: 'books')]
    #[ORM\JoinColumn(nullable: false)]
    private $collection;

    #[ORM\ManyToMany(targetEntity: Theme::class, inversedBy: 'books')]
    private $themes;

    #[ORM\OneToOne(mappedBy: 'book', targetEntity: Loan::class, cascade: ['persist', 'remove'])]
    private $loan;


    public function __construct()
    {
        $this->themes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getReleaseAt(): ?\DateTimeImmutable
    {
        return $this->release_at;
    }

    public function setReleaseAt(\DateTimeImmutable $release_at): self
    {
        $this->release_at = $release_at;

        return $this;
    }

    public function getAddedAt(): ?\DateTimeImmutable
    {
        return $this->added_at;
    }

    public function setAddedAt(\DateTimeImmutable $added_at): self
    {
        $this->added_at = $added_at;

        return $this;
    }

    public function getImg(): ?string
    {
        return $this->img;
    }

    public function setImg(string $img): self
    {
        $this->img = $img;

        return $this;
    }

    public function getResume(): ?string
    {
        return $this->resume;
    }

    public function setResume(string $resume): self
    {
        $this->resume = $resume;

        return $this;
    }

    public function getAuthor(): ?Author
    {
        return $this->author;
    }

    public function setAuthor(?Author $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getPublisher(): ?Publisher
    {
        return $this->publisher;
    }

    public function setPublisher(?Publisher $publisher): self
    {
        $this->publisher = $publisher;

        return $this;
    }

    public function getCollection(): ?Collec
    {
        return $this->collection;
    }

    public function setCollection(?Collec $collection): self
    {
        $this->collection = $collection;

        return $this;
    }

    /**
     * @return Collection|Theme[]
     */
    public function getThemes(): Collection
    {
        return $this->themes;
    }

    public function addTheme(Theme $theme): self
    {
        if (!$this->themes->contains($theme)) {
            $this->themes[] = $theme;
        }

        return $this;
    }

    public function removeTheme(Theme $theme): self
    {
        $this->themes->removeElement($theme);

        return $this;
    }

    public function toArray() {
        $themes = $this->getThemes();
        $themesArray = [];
        foreach ($themes as $theme) {
            $themesArray[] = $theme->toArray();
        }

        return array(
            'id' => $this->getId(),
            'code' => $this->getCode(),
            'title' => $this->getTitle(),
            'author' => $this->getAuthor()->toArray(),
            'publisher' => $this->getPublisher()->toArray(),
            'collection' => $this->getCollection()->toArray(),
            'themes' => $themesArray,
            'release_at' => $this->getReleaseAt()->format('Y-m-d'),
            'added_at' => $this->getAddedAt()->format('Y-m-d'),
            'img' => $this->getImg(),
            'resume' => $this->getResume()
        );
    }

    public function jsonSerialize(): mixed
    {
        return $this->toArray();
    }

    public function getLoan(): ?Loan
    {
        return $this->loan;
    }

    public function setLoan(?Loan $loan): self
    {
        $this->loan = $loan;

        return $this;
    }
}
