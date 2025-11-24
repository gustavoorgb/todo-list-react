<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class LoginController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request)
    {
        // Não precisa implementar, LexikJWTBundle intercepta a requisição JSON
        throw new \Exception('This should never be called');
    }
}
