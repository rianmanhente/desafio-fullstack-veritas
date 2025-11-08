export type Task = {
  id: string;
  title: string;
  description: string;
  status: "A Fazer" | "Em Progresso" | "Concluídas";
  createdAt?: string;
  updatedAt?: string;
};