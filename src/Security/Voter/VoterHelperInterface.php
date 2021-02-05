<?php


namespace App\Security\Voter;


use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

interface VoterHelperInterface
{
    /**
     * @param string $attribute
     * @param $subject
     * @param TokenInterface $token
     * @return bool
     */
    public function handleVoteOnAttribute(string $attribute, $subject, TokenInterface $token): bool;

    /**
     * @param $attribute
     * @return bool
     */
    public function handleAttribute($attribute): bool;
}