<?php

namespace App\Security\Voter;

use App\Entity\Image;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Security;

class ImageVoter extends \Symfony\Component\Security\Core\Authorization\Voter\Voter
{

    private VoterHelperInterface $voterHelper;
    private Security $security;

    public function __construct(VoterHelperInterface $voterHelper,Security $security)
    {
        $this->voterHelper = $voterHelper;
        $this->security = $security;
    }
    /**
     * @inheritDoc
     */
    protected function supports(string $attribute, $subject): bool
    {
        return $subject instanceof Image  && $this->voterHelper->handleAttribute($attribute);
    }

    /**
     * @inheritDoc
     */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        return $this->voterHelper->handleVoteOnAttribute($attribute,$subject,$token);
    }
}