<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TagRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"tag:read"}},
 *     denormalizationContext={"groups"={"tag:write"}},
 *     collectionOperations={
 *           "get",
 *           "post"={"security"="is_granted('ROLE_EDITOR')","security_message"="Нямате необходимите права да създадете статия."}
 *     },
 *     itemOperations={
 *          "get"={"security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"},
 *          "put"={"security"="is_granted('EDIT',object)","security_message"="Нямате необходимите права да редактирате статия."},
 *          "patch"={"security"="is_granted('EDIT',object)","security_message"="Нямате необходимите права да редактирате статия."},
 *          "delete"={"security"="is_granted('DELETE',object)","security_message"="Нямате необходимите права да изтривате статия."}
 *     }
 * )
 * @ORM\Entity(repositoryClass=TagRepository::class)
 */
class Tag
{
    /**
     * @Groups({"tag:read","article:read","news:read"})
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"tag:read","tag:write","article:read","news:read"})
     * @ORM\Column(type="string", length=255,unique=true)
     * @Assert\NotBlank()
     * @Assert\Length(
     *      min = 3,
     *      max = 15,
     *      minMessage = "Tag name must be at least {{ limit }} characters long",
     *      maxMessage = "Tag name cannot be longer than {{ limit }} characters"
     * )
     */
    private $name;

    /**
     * @Groups({"tag:read","tag:write","article:read","news:read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;


    /**
     * @Groups({"tag:read"})
     * @ORM\ManyToMany(targetEntity=Article::class, inversedBy="tags")
     */
    private $articles;

    /**
     * @Groups({"tag:read"})
     * @ORM\ManyToMany(targetEntity=News::class, inversedBy="tags")
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
        }

        return $this;
    }

    public function removeArticle(Article $article): self
    {
        $this->articles->removeElement($article);

        return $this;
    }

    /**
     * @return Collection|News[]
     */
    public function getNews(): Collection
    {
        return $this->news;
    }

    public function addNews(News $news): self
    {
        if (!$this->news->contains($news)) {
            $this->news[] = $news;
            $news->addTag($this);
        }

        return $this;
    }

    public function removeNews(News $news): self
    {
        if ($this->news->removeElement($news)) {
            $news->removeTag($this);
        }

        return $this;
    }
}
