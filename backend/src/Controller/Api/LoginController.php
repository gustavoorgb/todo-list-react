<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class LoginController extends AbstractController {
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request) {
        throw new \Exception('This should never be called');
    }

    #[Route('/api/user', name: 'api_user', methods: ['GET'])]
    public function user() {
        /** @var \App\Entity\User $user */
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'User Unauthenticated'], 401);
        }

        return $this->json([
            'id' => $user->getId(),
            'name' => $user->getName(),
            'email' => $user->getEmail(),
        ]);
    }
}
