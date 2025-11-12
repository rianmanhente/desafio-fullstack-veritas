import { api } from "./api";

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await api.delete(`/tasks/${id}`); 
  } catch (err) {
    console.error("Erro ao deletar task:", err);
    throw err;
  }
};