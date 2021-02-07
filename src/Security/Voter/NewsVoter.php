<?php


namespace App\Security\Voter;


use App\Entity\News;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class NewsVoter extends Voter
{

    private $voterHelper;

    public function __construct(VoterHelperInterface $voterHelper)
    {
        $this->voterHelper = $voterHelper;
    }
    /**
     * @inheritDoc
     */
    protected function supports(string $attribute, $subject)
    {
        return $subject instanceof News  && $this->voterHelper->handleAttribute($attribute);
    }

    /**
     * @inheritDoc
     */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        return $this->voterHelper->handleVoteOnAttribute($attribute,$subject,$token);
    }
}