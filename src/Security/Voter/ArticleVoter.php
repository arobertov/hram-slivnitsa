<?php


namespace App\Security\Voter;


use App\Entity\Article;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class ArticleVoter extends HelpersVoter
{

    /**
     * @param $subject
     * @return bool
     */
    protected function validateObject($subject) :bool
    {
        if($subject instanceof Article){
            return true;
        }

        return false;
    }

    protected function validateOwner($subject): bool
    {
        // TODO: Implement validateOwner() method.
    }
}