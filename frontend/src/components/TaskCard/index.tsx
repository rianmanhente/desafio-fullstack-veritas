import { CardContainer, CardHeader, CardTitle, CardDescription, CardActions, IconButton } from "./styles";
import type { Task } from "../../utils/typeTask";

interface TaskCardProps {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardActions>
          <IconButton onClick={() => onEdit(task.id)} aria-label="Editar tarefa">
            ✏️
          </IconButton>
          <IconButton onClick={() => onDelete(task.id)} aria-label="Excluir tarefa" variant="delete">
            🗑️
          </IconButton>
        </CardActions>
      </CardHeader>
      <CardDescription>{task.description}</CardDescription>
    </CardContainer>
  );
}