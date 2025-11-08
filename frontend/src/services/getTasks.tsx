import { api } from "./api";
import type { Task } from "../utils/typeTask";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const res = await api.get<Task[]>("/tasks");
    return res.data; 
  } catch (err) {
    console.error("Erro ao buscar tasks:", err);
    throw err; 
  }
};
