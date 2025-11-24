<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class RegisterController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $name = $data['name'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$name || !$email || !$password) {
            return $this->json(['error' => 'Missing fields'], 400);
        }

        // Verifica se o email já existe
        $existingUser = $em->getRepository(User::class)->findOneBy(['email' => $email]);
        if ($existingUser) {
            return $this->json(['error' => 'Email already in use'], 400);
        }

        $user = new User();
        $user->setName($name);
        $user->setEmail($email);
        $user->setPassword($passwordHasher->hashPassword($user, $password));

        $em->persist($user);
        $em->flush();

        return $this->json(['message' => 'User registered successfully'], 201);
    }
}
