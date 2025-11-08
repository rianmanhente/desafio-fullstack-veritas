import { ButtonContainer } from "./styles";

interface TaskButtonProps {
  status: "A Fazer" | "Em Progresso" | "Concluídas";
  onClick: (status: "A Fazer" | "Em Progresso" | "Concluídas") => void;
}

export default function AddTaskButton({ status, onClick }: TaskButtonProps) {
  return (
    <ButtonContainer onClick={() => onClick(status)}>
      <span>+</span>
      <span>Adicionar tarefa</span>
    </ButtonContainer>
  );
}