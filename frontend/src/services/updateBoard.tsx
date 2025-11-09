import { api } from "./api";
import type { Board } from "../utils/typeBoard";

interface UpdateBoardData {
  name: string;
}

export async function updateBoard(id: string, data: UpdateBoardData): Promise<Board> {
  const response = await api.put(`/boards/${id}`, data);
  return response.data;
}