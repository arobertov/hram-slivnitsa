<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use App\Repository\ArticleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"article:read"}},
 *     denormalizationContext={"groups"={"article:write"}},
 *      collectionOperations={
 *           "get",
 *           "post"={"security"="is_granted('ROLE_EDITOR')","security_message"="Нямате необходимите права да създадете статия."}
 *     },
 *     itemOperations={
 *          "get"={"security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"},
 *          "put"={
 *                  "security"="is_granted('EDIT',object)",
 *                  "security_message"="Нямате необходимите права да редактирате статия."
 *          },
 *          "patch"={"security"="is_granted('EDIT',object)","security_message"="Нямате необходимите права да редактирате статия."},
 *          "delete"={"security"="is_granted('DELETE',object)","security_message"="Нямате необходимите права да изтривате статия."}
 *     }
 * )
 * @ApiFilter(OrderFilter::class,properties={"dateEdited":"DESC"})
 * @ORM\Entity(repositoryClass=ArticleRepository::class)
 * @ORM\EntityListeners({"App\Listener\ArticleListener"})
 */
class Article
{
    /**
     * @Groups("article:read")
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

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
    private string $title;

    /**
     * @Groups({"article:read","article:write"})
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     */
    private string $content;

    /**
     * @Groups({"article:read","article:write"})
     * @ORM\Column (type="boolean",nullable=true)
     */
    private bool  $isPublished;

    /**
     * @Groups({"article:read"})
     * @ORM\Column(type="datetime")
     */
    private \DateTimeInterface $dateCreated;

    /**
     * @Groups({"article:read"})
     * @ORM\Column(type="datetime")
     */
    private \DateTimeInterface $dateEdited;

    /**
     * @Groups({"article:read","article:write"})
     * @ORM\ManyToMany(targetEntity=Tag::class, mappedBy="articles")
     */
    private $tags;

    /**
     * @Groups({"article:read","article:write"})
     * @ORM\ManyToMany(targetEntity=Image::class, mappedBy="articles")
     */
    private $images;

    /**
     * @Groups({"article:read","article:write"})
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="articles")
     */
    private Category $category;

    /**
     * @Groups({"article:read"})
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="articles")
     */
    private  $owner;

    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->images = new ArrayCollection();
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
        return $this->isPublished;
    }

    public function setIsPublished(bool $isPublished = false): self
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

    /**
     * @param Tag $tag
     * @return $this
     */
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

    /**
     * @return Collection | Tag[]
     */
    public function getImages() :Collection
    {
        return $this->images;
    }

    /**
     * @param Image $image
     * @return $this
     */
    public function addImage(Image $image): self
    {
        if(!$this->images->contains($image)){
            $this->images[] = $image;
            $image->addArticle($this);
        }
        return $this;
    }

    /**
     * @param Image $image
     * @return $this
     */
    public function removeImage(Image $image): self
    {
        if($this->images->removeElement($image)){
            $image->removeArticle($this);
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

    public function setOwner(?UserInterface $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * @return Security
     */
    public function getSecurity(): Security
    {
        return $this->security;
    }

    /**
     * @param Security $security
     */
    public function setSecurity(Security $security): void
    {
        $this->security = $security;
    }
}
