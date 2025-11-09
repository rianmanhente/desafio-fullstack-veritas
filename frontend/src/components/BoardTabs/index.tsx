import { useState } from "react";
import type { Board } from "../../utils/typeBoard";
import { TabsContainer, Tab, AddBoardButton, TabContent, DeleteButton, EditButton, TabActions } from "./styles";
import Swal from "sweetalert2";

interface BoardTabsProps {
  boards: Board[];
  activeBoard: string | null;
  onSelectBoard: (boardId: string) => void;
  onAddBoard: () => void;
  onEditBoard: (board: Board) => void;
  onDeleteBoard: (boardId: string) => void;
}

export default function BoardTabs({
  boards,
  activeBoard,
  onSelectBoard,
  onAddBoard,
  onEditBoard,
  onDeleteBoard,
}: BoardTabsProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const handleDelete = async (e: React.MouseEvent, board: Board) => {
    e.stopPropagation();

    const result = await Swal.fire({
      title: "Tem certeza?",
      text: `O board "${board.name}" e todas as suas tarefas serão excluídos permanentemente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      onDeleteBoard(board.id);
    }
  };

  const handleEdit = (e: React.MouseEvent, board: Board) => {
    e.stopPropagation();
    onEditBoard(board);
  };

  return (
    <TabsContainer>
      {boards.map((board) => (
        <Tab
          key={board.id}
          active={activeBoard === board.id}
          onClick={() => onSelectBoard(board.id)}
          onMouseEnter={() => setHoveredTab(board.id)}
          onMouseLeave={() => setHoveredTab(null)}
        >
          <TabContent>{board.name}</TabContent>
          {hoveredTab === board.id && (
            <TabActions>
              <EditButton onClick={(e) => handleEdit(e, board)} title="Editar board">
                ✏️
              </EditButton>
              <DeleteButton onClick={(e) => handleDelete(e, board)} title="Deletar board">
                🗑️
              </DeleteButton>
            </TabActions>
          )}
        </Tab>
      ))}
      <AddBoardButton onClick={onAddBoard}>+ Novo Board</AddBoardButton>
    </TabsContainer>
  );
}