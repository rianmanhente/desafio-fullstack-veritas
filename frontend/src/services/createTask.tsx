import { api } from "./api";
import type { Task } from "../utils/typeTask";

type CreateTaskData = Pick<Task, "title" | "description" | "status">;

export const createTask = async(taskData: CreateTaskData): Promise<Task> => {
    try {
        const res = await api.post<Task>("/tasks", taskData);
        return res.data;
    }catch(err) {
        console.error("Erro ao criar task:", err);
        throw err; 
    }
}

