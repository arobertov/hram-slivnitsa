<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"category:read"}},
 *     denormalizationContext={"groups"={"category:write"}},
 *     collectionOperations={
 *           "get",
 *           "post"={"security"="is_granted('ROLE_EDITOR')","security_message"="Нямате необходимите права да създадете категория."}
 *     },
 *     itemOperations={
 *          "get"={"security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"},
 *          "put"={"security"="is_granted('EDIT',object)","security_message"="Нямате необходимите права да редактирате категорията."},
 *          "patch"={"security"="is_granted('EDIT',object)","security_message"="Нямате необходимите права да редактирате категорията."},
 *          "delete"={"security"="is_granted('DELETE',object)","security_message"="Нямате необходимите права да изтривате категорията."}
 *     }
 * )
 * @ORM\Entity(repositoryClass=CategoryRepository::class)
 */
class Category
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"category:read","category:write","article:read"})
     * @ORM\Column(type="string", length=255,unique=true)
     * @Assert\NotBlank()
     * @Assert\Length(
     *      min = 3,
     *      max = 20,
     *      minMessage = "Category name must be at least {{ limit }} characters long",
     *      maxMessage = "Category name cannot be longer than {{ limit }} characters"
     * )
     */
    private $name;

    /**
     * @Groups({"category:read","category:write"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @Groups({"category:read"})
     * @ORM\OneToMany(targetEntity=Article::class, mappedBy="category")
     */
    private $articles;

    /**
     * @Groups({"category:read"})
     * @ORM\OneToMany(targetEntity=News::class, mappedBy="category")
     */
    private $news;



    public function __construct()
    {
        $this->articles = new ArrayCollection();
        $this->news = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection|Article[]
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles[] = $article;
            $article->setCategory($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): self
    {
        if ($this->articles->removeElement($article)) {
            // set the owning side to null (unless already changed)
            if ($article->getCategory() === $this) {
                $article->setCategory(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Article[]
     */
    public function getNews(): Collection
    {
        return $this->news;
    }

    /**
     * @param News|null $news
     * @return $this
     */
    public function setNews(?News $news): self
    {
        $this->news = $news;

        return $this;
    }

    public function addNews(News $news): self
    {
        if (!$this->news->contains($news)) {
            $this->news[] = $news;
            $news->setCategory($this);
        }

        return $this;
    }

    public function removeNews(News $news): self
    {
        if ($this->news->removeElement($news)) {
            // set the owning side to null (unless already changed)
            if ($news->getCategory() === $this) {
                $news->setCategory(null);
            }
        }

        return $this;
    }
}
