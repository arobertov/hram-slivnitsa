<?php

namespace App\Listener;

use App\Entity\News;
use DateTime;
use Symfony\Component\Security\Core\Security;

class NewsListener
{
    /**
     * @var Security
     */
    private Security $security;

    public function __construct(Security $security){
        $this->security = $security;
    }

    public function prePersist(News $news){
        if($this->security->getUser()){
            $news->setOwner($this->security->getUser());
        }
        $news->setDateCreated(new DateTime('now'));
        $news->setDateEdited(new DateTime('now'));
    }

    public function preUpdate(News $news){
        if($news->getOwner()){
            return;
        }
        if($this->security->getUser()){
            $news->setOwner($this->security->getUser());
        }
        $news->setDateEdited(new DateTime('now'));
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