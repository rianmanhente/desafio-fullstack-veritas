import { api } from "./api";

export async function deleteBoard(id: string): Promise<void> {
  await api.delete(`/boards/${id}`);
}