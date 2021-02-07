<?php


namespace App\Security\Voter;


use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Security;

class VoterHelper implements VoterHelperInterface
{
    const VIEW = 'VIEW';
    const WRITE = 'WRITE';
    CONST EDIT = 'EDIT';
    CONST DELETE = 'DELETE';
    const ALL_ACTIONS = 'ALL_ACTIONS';

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @param string $attribute
     * @param $subject
     * @param TokenInterface $token
     * @return bool
     * @throws \Exception
     */
    public function handleVoteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        if($this->security->isGranted('ROLE_SUPER_ADMIN')){
            return true;
        }

        $user = $token->getUser();

        if(!$user instanceof User){
            return false;
        }

        switch($attribute){
            case self::VIEW:
                return $this->canView($subject,$user);
            case self::WRITE:
                return $this->security->isGranted('ROLE_EDITOR');
            case self::EDIT:
                return $this->canEdit($subject,$user);
            case self::DELETE:
                return $this->canDelete($subject,$user);
            case self::ALL_ACTIONS:
                return $this->allAction($subject,$user);
        }
        throw new \Exception(sprintf('Unhandled attribute "%s"', $attribute));
    }

    /**
     * @param $subject
     * @param $user
     * @return bool
     */
    private function canView($subject,$user): bool
    {
        if($this->canEdit($subject,$user)){
            return true;
        }
        if(property_exists($subject,'isPublished')){
            return $subject->getIsPublished();
        }
        return false;
    }

    /**
     * @param $subject
     * @param $user
     * @return bool
     */
    private function canEdit($subject,$user): bool
    {
        if(property_exists($subject,'owner')){
            return $subject->getOwner()===$user;
        }
        return false;
    }

    /**
     * @param $subject
     * @param $user
     * @return bool
     */
    private function canDelete($subject,$user): bool
    {
        if(property_exists($subject,'owner')){
            return $subject->getOwner()===$user;
        }
        return false;
    }

    /**
     * @param $subject
     * @param $user
     * @return bool
     */
    private function allAction($subject,$user): bool
    {
        return $this->security->isGranted('ROLE_EDITOR')&&$subject===$user;
    }

    /**
     * @param $attribute
     * @return bool
     * @throws \Exception
     */
    public function handleAttribute($attribute): bool
    {
        if(in_array($attribute,[self::VIEW,self::WRITE,self::EDIT,self::DELETE,self::ALL_ACTIONS])){
            return true;
        }
        throw new \Exception(sprintf('Unhandled attribute "%s"', $attribute));
    }

}