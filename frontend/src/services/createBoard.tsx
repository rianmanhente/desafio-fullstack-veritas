import { api } from "./api";
import type { Board } from "../utils/typeBoard";

interface CreateBoardData {
  name: string;
}

export async function createBoard(data: CreateBoardData): Promise<Board> {
  const response = await api.post("/boards", data);
  return response.data;
}