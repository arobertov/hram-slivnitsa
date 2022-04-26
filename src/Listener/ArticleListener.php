<?php

namespace App\Listener;

use App\Entity\Article;
use DateTime;
use Symfony\Component\Security\Core\Security;

class ArticleListener
{
    /**
     * @var Security
     */
    private Security $security;

    public function __construct(Security $security){
    $this->security = $security;
    }

    public function prePersist(Article $article){
        if($this->security->getUser()){
            $article->setOwner($this->security->getUser());
        }
        if($article->getDateCreated()===null){
            $article->setDateCreated(new DateTime('now'));
        }
        $article->setDateEdited(new DateTime('now'));
    }

    public function preUpdate(Article $article){
        if($article->getOwner()){
            return;
        }
        if($this->security->getUser()){
            $article->setOwner($this->security->getUser());
        }
        $article->setDateEdited(new DateTime('now'));
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