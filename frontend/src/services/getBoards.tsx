import { api } from "./api";
import type {  Board } from "../utils/typeBoard";

export async function getBoards(): Promise<Board[]> {
  const response = await api.get("/boards");
  return response.data;
}