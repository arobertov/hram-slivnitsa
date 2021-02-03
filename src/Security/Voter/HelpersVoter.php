<?php


namespace App\Security\Voter;


use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

abstract class HelpersVoter extends Voter
{
    const VIEW = 'VIEW';
    CONST EDIT = 'EDIT';
    CONST DELETE = 'DELETE';

    /**
     * @inheritDoc
     */
    protected function supports(string $attribute, $subject)
    {
        if($this->validateObject($subject)&&$this->handleAttribute($attribute)){
            return true;
        };

        return false;
    }


    /**
     * @inheritDoc
     */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();

        if(!$user instanceof User){
            return false;
        }

        return false;
    }

    private function handleAttribute($attribute){
        if(in_array($attribute,[self::VIEW,self::EDIT,self::DELETE])){
            return true;
        }
        return false;
    }

    /**
     * @param $subject
     * @return bool
     */
    abstract protected function validateObject($subject): bool;

    /**
     * @param $subject
     * @return bool
     */
    abstract protected function validateOwner($subject): bool;
}