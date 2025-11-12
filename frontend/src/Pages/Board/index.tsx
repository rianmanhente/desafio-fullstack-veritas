import { useEffect, useState } from "react";
import TaskToBoard from "../../components/TaskBoard/index";
import TaskModal from "../../components/TaskModal/index";
import BoardTabs from "../../components/BoardTabs/index";
import BoardModal from "../../components/BoardModal/index";
import { Container, BoardWrapper } from "./styles";
import { getTasks } from "../../services/getTasks";
import { createTask } from "../../services/createTask";
import { deleteTask } from "../../services/deleteTask";
import { putTask } from "../../services/putTask";
import { getBoards } from "../../services/getBoards";
import { createBoard } from "../../services/createBoard";
import { deleteBoard } from "../../services/deleteBoard";
import { updateBoard } from "../../services/updateBoard";
import type { Task } from "../../utils/typeTask";
import type { Board } from "../../utils/typeBoard";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import Swal from "sweetalert2";

function Board() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [activeBoard, setActiveBoard] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Task["status"]>("A Fazer");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

  // Carregar boards ao montar o componente
  useEffect(() => {
    async function fetchBoards() {
      try {
        const data = await getBoards();
        setBoards(data);
        
        // Seleciona o primeiro board automaticamente
        if (data.length > 0) {
          setActiveBoard(data[0].id);
        }
      } catch (err) {
        console.error("Erro ao buscar boards", err);
      }
    }
    fetchBoards();
  }, []);

  // Carregar tasks quando o board ativo mudar
  useEffect(() => {
    if (!activeBoard) return;

    async function fetchTasks() {
      try {
        const data = await getTasks(activeBoard);
        setTasks(data);
      } catch (err) {
        console.error("Erro ao buscar tarefas", err);
      }
    }
    fetchTasks();
  }, [activeBoard]);

  // BOARDS 
  const handleAddBoard = () => {
    setSelectedBoard(null);
    setIsBoardModalOpen(true);
  };

  const handleEditBoard = (board: Board) => {
    setSelectedBoard(board);
    setIsBoardModalOpen(true);
  };

  const handleCreateOrEditBoard = async (name: string) => {
    try {
      if (selectedBoard) {
        // Editar board existente
        const updatedBoard = await updateBoard(selectedBoard.id, { name });
        setBoards((prev) => prev.map((b) => (b.id === updatedBoard.id ? updatedBoard : b)));

        Swal.fire({
          icon: "success",
          title: "Board atualizado!",
          text: "O board foi editado com sucesso.",
          confirmButtonColor: "#3085d6",
        });
      } else {
        // Criar novo board
        const newBoard = await createBoard({ name });
        setBoards([...boards, newBoard]);
        setActiveBoard(newBoard.id);

        Swal.fire({
          icon: "success",
          title: "Board criado!",
          text: "Seu novo board foi adicionado com sucesso.",
          confirmButtonColor: "#3085d6",
        });
      }

      setIsBoardModalOpen(false);
      setSelectedBoard(null);
    } catch (err) {
      console.error("Erro ao salvar board", err);

      Swal.fire({
        icon: "error",
        title: "Erro ao salvar",
        text: "Não foi possível salvar o board. Tente novamente!",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleDeleteBoard = async (boardId: string) => {
    try {
      await deleteBoard(boardId);
      setBoards(boards.filter((b) => b.id !== boardId));

      // Se deletou o board ativo, seleciona outro
      if (activeBoard === boardId) {
        const remainingBoards = boards.filter((b) => b.id !== boardId);
        setActiveBoard(remainingBoards.length > 0 ? remainingBoards[0].id : null);
      }

      Swal.fire({
        icon: "success",
        title: "Board deletado!",
        text: "O board e suas tarefas foram excluídos com sucesso.",
        confirmButtonColor: "#3085d6",
      });
    } catch (err) {
      console.error("Erro ao excluir board", err);

      Swal.fire({
        icon: "error",
        title: "Erro ao deletar",
        text: "Erro ao excluir o board. Tente novamente!",
        confirmButtonColor: "#d33",
      });
    }
  };

  // TASKS 
  const handleAddTask = (status: Task["status"]) => {
    if (!activeBoard) {
      alert("Selecione um board primeiro!");
      return;
    }
    setSelectedStatus(status);
    setSelectedTask(null);
    setIsTaskModalOpen(true);
  };

  const handleCreateOrEditTask = async (title: string, description: string) => {
    if (!activeBoard) return;

    try {
      if (selectedTask) {
        const updatedTask = await putTask(selectedTask.id, {
          boardId: activeBoard,
          title: title || selectedTask.title,
          description: description || selectedTask.description,
          status: selectedTask.status,
        });
        setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));

        Swal.fire({
          icon: "success",
          title: "Tarefa atualizada!",
          text: "A tarefa foi editada com sucesso.",
          confirmButtonColor: "#3085d6",
        });
      } else {
        const newTask = await createTask({
          boardId: activeBoard,
          title,
          description,
          status: selectedStatus,
        });
        setTasks([...tasks, newTask]);

        Swal.fire({
          icon: "success",
          title: "Tarefa criada!",
          text: "Sua nova tarefa foi adicionada com sucesso.",
          confirmButtonColor: "#3085d6",
        });
      }

      setIsTaskModalOpen(false);
      setSelectedTask(null);
    } catch (err) {
      console.error("Erro ao salvar tarefa", err);

      Swal.fire({
        icon: "error",
        title: "Erro ao salvar",
        text: "Não foi possível salvar a tarefa. Tente novamente!",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleEditTask = (id: string) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (!taskToEdit) return;

    setSelectedTask(taskToEdit);
    setSelectedStatus(taskToEdit.status);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = async (id: string) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Essa tarefa será excluída permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));

      Swal.fire({
        icon: "success",
        title: "Tarefa Deletada!",
        text: "Sua Tarefa foi deletada com sucesso.",
        confirmButtonColor: "#3085d6",
      });
    } catch (err) {
      console.error("Erro ao excluir tarefa", err);

      Swal.fire({
        icon: "error",
        title: "Erro ao deletar",
        text: "Erro ao excluir Tarefa. Tente novamente!",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!activeBoard) return;

    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    const movedTask = tasks.find((t) => t.id === draggableId);
    if (!movedTask) return;

    const updated = { ...movedTask, status: destination.droppableId as Task["status"] };
    setTasks((prev) => prev.map((t) => (t.id === movedTask.id ? updated : t)));

    try {
      await putTask(movedTask.id, {
        ...updated,
        boardId: activeBoard,
      });
    } catch (err) {
      console.error("Erro ao mover tarefa", err);
      alert("Erro ao mover tarefa!");
    }
  };

  return (
    <BoardWrapper>
      <BoardTabs
        boards={boards}
        activeBoard={activeBoard}
        onSelectBoard={setActiveBoard}
        onAddBoard={handleAddBoard}
        onEditBoard={handleEditBoard}
        onDeleteBoard={handleDeleteBoard}
      />

      {activeBoard ? (
        <Container>
          <DragDropContext onDragEnd={handleDragEnd}>
            <TaskToBoard
              tasks={tasks}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </DragDropContext>
        </Container>
      ) : (
        <Container>
          <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
            <h2>Nenhum board selecionado</h2>
            <p>Crie um novo board para começar!</p>
          </div>
        </Container>
      )}

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleCreateOrEditTask}
        status={selectedStatus}
        task={selectedTask}
      />

      <BoardModal
        isOpen={isBoardModalOpen}
        onClose={() => setIsBoardModalOpen(false)}
        onSubmit={handleCreateOrEditBoard}
        board={selectedBoard}
      />
    </BoardWrapper>
  );
}

export default Board;