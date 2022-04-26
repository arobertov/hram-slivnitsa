<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\NewsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"news:read"}},
 *     denormalizationContext={"groups"={"news:write"}},
 *      collectionOperations={
 *           "get",
 *           "post"={"security"="is_granted('ROLE_EDITOR')","security_message"="Нямате необходимите права да създадете новина."}
 *     },
 *     itemOperations={
 *          "get"={"security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"},
 *          "put"={"security"="is_granted('EDIT',object)","security_message"="Нямате необходимите права да редактирате новина."},
 *          "patch"={"security"="is_granted('EDIT',object)","security_message"="Нямате необходимите права да редактирате новина."},
 *          "delete"={"security"="is_granted('DELETE',object)","security_message"="Нямате необходимите права да изтривате новина."}
 *     }
 * )
 * @ORM\Entity(repositoryClass=NewsRepository::class)
 * @ORM\EntityListeners ({"App\Listener\NewsListener"})
 * @UniqueEntity("title")
 *
 */
class News
{
    /**
     * @Groups("news:read","category:read")
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private ?int $id;

    /**
     * @Groups({"news:read","news:write"})
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     * @Assert\Length(
     *      min = 3,
     *      max = 50,
     *      minMessage = " Заглавието трябва да бъде по-дълго от {{ limit }} символа",
     *      maxMessage = "Заглавието трябва да бъде по-късо от {{ limit }} символа"
     * )
     */
    private ?string $title;

    /**
     * @Groups({"news:read","news:write"})
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     */
    private ?string $content;

    /**
     * @Groups({"news:read","news:write"})
     * @ORM\Column (type="boolean",nullable=true)
     */
    private ?bool $isPublished;

    /**
     * @Groups({"news:read"})
     * @ORM\Column(type="datetime")
     */
    private ?\DateTimeInterface $dateCreated;

    /**
     * @Groups({"news:read"})
     * @ORM\Column(type="datetime")
     */
    private ?\DateTimeInterface $dateEdited;



    /**
     * @Groups({"news:read","news:write"})
     * @ORM\ManyToMany(targetEntity=Tag::class, mappedBy="news")
     */
    private $tags;

    /**
     * @Groups({"news:read","news:write"})
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="news")
     */
    private $category;

    /**
     * @Groups({"news:read","news:write"})
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="news")
     */
    private $owner;

    /**
     * @Groups({"news:read","news:write"})
     * @ORM\ManyToMany(targetEntity=Image::class, mappedBy="newses")
     */
    private $images;


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


    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

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
            $tag->addNews($this);
        }

        return $this;
    }

    public function removeTag(Tag $tag): self
    {
        if ($this->tags->removeElement($tag)) {
            $tag->removeNews($this);
        }

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

    public function getIsPublished(): ?bool
    {
        return $this->isPublished;
    }

    public function setIsPublished(?bool $isPublished): self
    {
        $this->isPublished = $isPublished;

        return $this;
    }

    /**
     * @return Collection<int, Image>
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(Image $image): self
    {
        if (!$this->images->contains($image)) {
            $this->images[] = $image;
            $image->addNews($this);
        }

        return $this;
    }

    public function removeImage(Image $image): self
    {
        if ($this->images->removeElement($image)) {
            $image->removeNews($this);
        }

        return $this;
    }

}
