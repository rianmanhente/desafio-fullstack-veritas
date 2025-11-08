import { api } from "./api";

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await api.delete(`/tasks/${id}`); // 👈 Corrigido: usar () ao invés de template literal
    // DELETE geralmente não retorna nada, então removemos o tipo Task[]
  } catch (err) {
    console.error("Erro ao deletar task:", err);
    throw err;
  }
};