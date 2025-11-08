import { useEffect, useState } from "react";
import { ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, TextArea, Button, CloseButton } from "./styles";
import type { Task } from "../../utils/typeTask";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
  status: Task["status"];
  task?: Task | null; // ✅ nova prop
}

export default function TaskModal({ isOpen, onClose, onSubmit, status, task }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Quando abrir o modal, preencher com dados da task (se houver)
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("O título é obrigatório!");
      return;
    }

    onSubmit(title, description);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>{task ? "Editar Tarefa" : "Nova Tarefa"} - {status}</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div>
              <label htmlFor="title">Título *</label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título da tarefa"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="description">Descrição</label>
              <TextArea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Digite a descrição da tarefa (opcional)"
                rows={4}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {task ? "Salvar Alterações" : "Criar Tarefa"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}
