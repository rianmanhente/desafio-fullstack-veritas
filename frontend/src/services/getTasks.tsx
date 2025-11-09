import { api } from "./api";
import type { Task } from "../utils/typeTask";

export async function getTasks(boardId?: string): Promise<Task[]> {
  const url = boardId ? `/tasks?boardId=${boardId}` : "/tasks";
  const response = await api.get(url);
  return response.data;
}