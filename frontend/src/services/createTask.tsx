import { api } from "./api";
import type { Task } from "../utils/typeTask";

interface CreateTaskData {
  boardId: string; 
  title: string;
  description: string;
  status: Task["status"];
}

export async function createTask(data: CreateTaskData): Promise<Task> {
  const response = await api.post("/tasks", data);
  return response.data;
}