import { api } from "./api";
import type { Task } from "../utils/typeTask";

export const putTask = async (id: string, data: Partial<Task>) : Promise<Task> => {
  try {
    const res = await api.put<Task>(`/tasks/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Erro ao atualizar task:", err);
    throw err;
  }
};
