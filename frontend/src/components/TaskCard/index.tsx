import { CardContainer, CardHeader, CardTitle, CardDescription, CardActions, IconButton, CardFooter, DateText } from "./styles";
import type { Task } from "../../utils/typeTask";
import { formatDateRelative } from "../../utils/formatDate";

interface TaskCardProps {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  // Verifica se foi editada (updatedAt diferente de createdAt)
  const wasEdited = task.updatedAt && task.createdAt && task.updatedAt !== task.createdAt;

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
      
      {(task.createdAt || task.updatedAt) && (
        <CardFooter>
          {wasEdited && task.updatedAt ? (
            <DateText>✏️ Editada {formatDateRelative(task.updatedAt)}</DateText>
          ) : task.createdAt ? (
            <DateText>📅 Criada {formatDateRelative(task.createdAt)}</DateText>
          ) : null}
        </CardFooter>
      )}
    </CardContainer>
  );
}