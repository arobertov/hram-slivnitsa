<?php

namespace App\Controller;

use App\Entity\Image;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Vich\UploaderBundle\Storage\StorageInterface;

final class ImageController
{
    private StorageInterface $storage;

    public function __construct(StorageInterface $storage)
    {
        $this->storage = $storage;
    }
    public function __invoke(Request $request): Image
    {
        $uploadedFile = $request->files->get('fileImage');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $image = new Image();
        $image->fileImage = $uploadedFile;

        return $image;
    }
}