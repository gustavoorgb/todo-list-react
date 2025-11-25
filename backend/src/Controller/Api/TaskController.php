<?php

namespace App\Controller\Api;

use App\Entity\Task;
use App\Repository\TaskRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class TaskController extends AbstractController {
    #[Route('/api/tasks', name: 'api_todo_list', methods: ['GET'])]
    public function list(TaskRepository $taskRepository): JsonResponse {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['message' => 'User not authenticated.'], 401);
        }

        $tasks = $taskRepository->findByUser($user);

        $data = array_map(fn($task) => [
            'id' => $task->getId(),
            'title' => $task->getTitle(),
            'description' => $task->getDescription(),
            'createdAt' => $task->getCreatedAt()->format('Y-m-d H:i:s'),
            'isCompleted' => $task->isCompleted(),
        ], $tasks);

        return $this->json($data, 200);
    }

    #[Route('/api/task', name: 'api_todo_task_create', methods: ['POST'])]
    public function create(TaskRepository $taskRepository, Request $request, EntityManagerInterface $em): JsonResponse {
        $user = $this->getUser();
        if (!$user)
            return new JsonResponse(['message' => 'User not authenticated.'], 401);

        $json = json_decode($request->getContent(), true);

        if (!isset($json['title']) || empty($json['title']))
            return new JsonResponse(['message' => 'Title is required.'], 400);

        $task = new Task();
        $task->setTitle($json['title']);
        $task->setDescription($json['description'] ?? null);
        $task->setUser($user);
        $task->setCreatedAt(new \DateTimeImmutable());
        $task->setIsCompleted(false);

        $em->persist($task);
        $em->flush();

        return $this->json([
            'message' => 'Task created successfully.',
            'task' => [
                'id'          => $task->getId(),
                'title'       => $task->getTitle(),
                'description' => $task->getDescription(),
                'createdAt'   => $task->getCreatedAt()->format('Y-m-d H:i:s'),
                'isCompleted' => $task->isCompleted(),
            ]
        ], 201);
    }

    #[Route('/api/tasks/{id}', name: 'api_todo_task_update', methods: ['PUT'])]
    public function update(Task $task, Request $request, EntityManagerInterface $em): JsonResponse {
        /** @var \App\Entity\User $user */
        $user = $this->getUser();
        if (!$user)
            return new JsonResponse(['message' => 'User not authenticated.'], 401);

        if ($task->getUser()->getId() !== $user->getId())
            return new JsonResponse(['message' => 'Task not found.'], 404);

        $json = json_decode($request->getContent(), true);

        if (isset($json['title']))
            $task->setTitle($json['title']);

        if (isset($json['description']))
            $task->setDescription($json['description']);

        if (isset($json['isCompleted']))
            $task->setIsCompleted((bool) $json['isCompleted']);

        $em->flush();

        return $this->json([
            'message' => 'Task updated successfully.',
            'task' => [
                'id'          => $task->getId(),
                'title'       => $task->getTitle(),
                'description' => $task->getDescription(),
                'createdAt'   => $task->getCreatedAt()->format('Y-m-d H:i:s'),
                'isCompleted' => $task->isCompleted(),
            ]
        ]);
    }

    #[Route('/api/tasks/{id}', name: 'api_todo_task_delete', methods: ['DELETE'])]
    public function delete(Task $task, EntityManagerInterface $em): JsonResponse {
        /** @var \App\Entity\User $user */
        $user = $this->getUser();

        if (!$user)
            return new JsonResponse(['message' => 'User not authenticated.'], 401);

        if ($task->getUser()->getId() !== $user->getId())
            return new JsonResponse(['message' => 'Task not found.'], 404);


        $em->remove($task);
        $em->flush();

        return $this->json(['message' => 'Task deleted successfully.'], 200);
    }
}
