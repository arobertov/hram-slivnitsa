<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ImageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use App\Controller\ImageController;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"image:read"}},
 *     denormalizationContext={"groups"={"image:write"}},
 *     collectionOperations={
 *      "get",
 *      "post"={
 *              "controller"=ImageController::class,
 *              "deserialize"=false,
 *              "security"="is_granted('ROLE_EDITOR')",
 *              "security_message"="Нямате необходимите права да качвате изображение.",
 *              "openapi_context"={
 *                 "requestBody"={
 *                     "content"={
 *                         "multipart/form-data"={
 *                             "schema"={
 *                                 "type"="object",
 *                                 "properties"={
 *                                     "fileImage"={
 *                                         "type"="string",
 *                                         "format"="binary"
 *                                     }
 *                                 }
 *                             }
 *                         }
 *                     }
 *                 }
 *             }
 *      }
 *     },
 *     itemOperations={
 *          "get"={"security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"},
 *          "delete"={"security"="is_granted('DELETE',object)","security_message"="Нямате необходимите права да изтривате изображение."}
 *     }
 * )
 * @ORM\Entity(repositoryClass=ImageRepository::class)
 * @Vich\Uploadable()
 */
class Image
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"image:read","article:read","news:read"})
     */
    private int $id;

    /**
     * @Groups({"image:read","article:read","news:read"})
     */
    public ?string $contentUrl;

    /**
     *@Vich\UploadableField(mapping="image", fileNameProperty="filePath")
     *@var File|null
     */
    public ?File $fileImage = null;

    /**
     * @ORM\Column(nullable=true)
     * @Groups({"image:read","image:write","article:read","news:read"})
     */
    public ?string $filePath = null;

    /**
     * @ORM\ManyToMany(targetEntity=Article::class,inversedBy="images")
     * @Groups({"image:read"})
     */
    private  $articles;

    /**
     * @ORM\ManyToMany(targetEntity=News::class, inversedBy="images")
     * @Groups({"image:read"})
     */
    private $newses;


    public function __construct(){
        $this->articles = new ArrayCollection();
        $this->newses = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContentUrl(): ?string
    {
        return $this->contentUrl;
    }

    public function setContentUrl(string $contentUrl): self
    {
        $this->contentUrl = $contentUrl;

        return $this;
    }

    public function getFileImage(): ?File
    {
        return $this->fileImage;
    }

    /**
     * @param File|null $fileImage
     * @return $this
     */
    public function setFileImage(?File $fileImage = null): self
    {
        $this->fileImage = $fileImage;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    /**
     * @param string|null $filePath
     */
    public function setFilePath(?string $filePath): void
    {
        $this->filePath = $filePath;
    }

    /**
     * @return Collection | Article[]
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    /**
     * @param Article $article
     * @return $this
     */
    public function addArticle(Article $article): self
    {
        if(!$this->articles->contains($article)){
            $this->articles->add($article);
        }

        return $this;
    }

    /**
     * @param Article $article
     * @return $this
     */
    public function removeArticle(Article $article): self
    {
        if($this->articles->removeElement($article)){
            $article->removeImage($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, News>
     */
    public function getNewses(): Collection
    {
        return $this->newses;
    }

    public function addNews(News $news): self
    {
        if (!$this->newses->contains($news)) {
            $this->newses[] = $news;
        }

        return $this;
    }

    public function removeNews(News $news): self
    {
        $this->newses->removeElement($news);

        return $this;
    }

}
