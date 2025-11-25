// src/features/todo/services/todoService.ts
import { api } from "../../api";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  createdAt: string;
  isCompleted: boolean;
}

export interface TaskDTO {
  title?: string;
  description?: string | null; // optional
  isCompleted?: boolean;
}

export async function getTasks(): Promise<Task[]> {
  const res = await api.get("/api/tasks");
  return res.data;
}

export async function createTask(data: TaskDTO): Promise<{ message: string, task: Task }> {
  const res = await api.post("/api/task", data);
  return res.data;
}

export async function updateTask(id: number, data: TaskDTO): Promise<{ message: string, task: Task }> {
  const res = await api.put(`/api/tasks/${id}`, data);
  return res.data;
}

export async function deleteTask(id: number): Promise<{ message: string }> {
  const res = await api.delete(`/api/tasks/${id}`);
  return res.data;
}
