import { useEffect, useState } from "react";
import { ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button, CloseButton } from "./styles";
import type { Board } from "../../services/getBoards";

interface BoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  board?: Board | null;
}

export default function BoardModal({ isOpen, onClose, onSubmit, board }: BoardModalProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (board) {
      setName(board.name);
    } else {
      setName("");
    }
  }, [board, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("O nome do board é obrigatório!");
      return;
    }

    onSubmit(name);
    setName("");
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>{board ? "Editar Board" : "Novo Board"}</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div>
              <label htmlFor="name">Nome do Board *</label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Projeto X, Pessoal, Trabalho..."
                autoFocus
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {board ? "Salvar Alterações" : "Criar Board"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}