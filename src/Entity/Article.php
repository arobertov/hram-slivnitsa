<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ArticleRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *      normalizationContext={"groups"={"article:read"}},
 *     denormalizationContext={"groups"={"article:write"}},
 *      collectionOperations={
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
 * @ORM\Entity(repositoryClass=ArticleRepository::class)
 */
class Article
{
    /**
     * @Groups("article:read")
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"article:read","article:write"})
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     * @Assert\Length(
     *      min = 3,
     *      max = 50,
     *      minMessage = "Article title must be at least {{ limit }} characters long",
     *      maxMessage = "Article title cannot be longer than {{ limit }} characters"
     * )
     */
    private $title;

    /**
     * @Groups({"article:read","article:write"})
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     */
    private $content;

    /**
     * @Groups({"article:read","article:write"})
     * @ORM\Column (type="boolean",nullable=true)
     */
    private $isPublished;

    /**
     * @Groups({"article:read"})
     * @ORM\Column(type="datetime")
     */
    private $dateCreated;

    /**
     * @Groups({"article:read"})
     * @ORM\Column(type="datetime")
     */
    private $dateEdited;

    /**
     * @Groups({"article:read","article:write"})
     * @ORM\ManyToMany(targetEntity=Tag::class, mappedBy="articles")
     */
    private $tags;

    /**
     * @Groups({"article:read","article:write"})
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="articles")
     */
    private $category;

    /**
     * @Groups({"article:read","article:write"})
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="articles")
     */
    private $owner;


    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->setDateCreated(new DateTime('now'));
        $this->setDateEdited(new DateTime('now'));
    }

    public function getId(): ?int
    {
        return $this->id;
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


    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getIsPublished(): bool
    {
        if ($this->isPublished===null){
            return false;
        }
        return $this->isPublished;
    }

    public function setIsPublished(bool $isPublished=false): self
    {
        $this->isPublished = $isPublished;

        return $this;
    }

    public function getDateCreated(): ?\DateTimeInterface
    {
        return $this->dateCreated;
    }

    public function setDateCreated(\DateTimeInterface $dateCreated): self
    {
        $this->dateCreated = $dateCreated;

        return $this;
    }

    public function getDateEdited(): ?\DateTimeInterface
    {
        return $this->dateEdited;
    }

    public function setDateEdited(\DateTimeInterface $dateEdited): self
    {
        $this->dateEdited = $dateEdited;

        return $this;
    }

    /**
     * @return Collection|Tag[]
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): self
    {
        if (!$this->tags->contains($tag)) {
            $this->tags[] = $tag;
            $tag->addArticle($this);
        }

        return $this;
    }

    public function removeTag(Tag $tag): self
    {
        if ($this->tags->removeElement($tag)) {
            $tag->removeArticle($this);
        }

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }
}
