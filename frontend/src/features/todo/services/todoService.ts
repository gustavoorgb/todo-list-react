// src/features/todo/services/todoService.ts
import { api } from "../../api";

export interface TodoDTO {
  title: string;
}

export async function getTodos() {
  const res = await api.get("/api/todos");
  return res.data;
}

export async function createTodo(data: TodoDTO) {
  const res = await api.post("/api/todos", data);
  return res.data;
}

export async function deleteTodo(id: number) {
  await api.delete(`/api/todos/${id}`);
}
