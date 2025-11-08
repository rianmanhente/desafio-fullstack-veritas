import { useEffect, useState } from "react";
import TaskToBoard from "../../components/TaskBoard/index";
import TaskModal from "../../components/TaskModal/index";
import { Container } from "./styles";
import { getTasks } from "../../services/getTasks";
import { createTask } from "../../services/createTask";
import { deleteTask } from "../../services/deleteTask";
import { putTask } from "../../services/putTask";
import type { Task } from "../../utils/typeTask";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd"; 
import Swal from "sweetalert2";


function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Task["status"]>("A Fazer");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error("Erro ao buscar tarefas", err);
      }
    }
    fetchTasks();
  }, []);

  const handleAddTask = (status: Task["status"]) => {
    setSelectedStatus(status);
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleCreateOrEditTask = async (title: string, description: string) => {
    try {
      if (selectedTask) {
        const updatedTask = await putTask(selectedTask.id, {
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

      setIsModalOpen(false);
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
    setIsModalOpen(true);
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
      title: "Erro ao salvar",
      text: "Erro ao excluir Tarefa. Tente novamente!",
      confirmButtonColor: "#d33",
    });
    }
  };

  // 🧠 Função chamada quando solta uma tarefa
  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return; // soltou fora de uma coluna

    // Se não mudou de coluna, não faz nada
    if (destination.droppableId === source.droppableId) return;

    const movedTask = tasks.find((t) => t.id === draggableId);
    if (!movedTask) return;

    // Atualiza o status visualmente
    const updated = { ...movedTask, status: destination.droppableId as Task["status"] };
    setTasks((prev) =>
      prev.map((t) => (t.id === movedTask.id ? updated : t))
    );

    // Atualiza no backend
    try {
      await putTask(movedTask.id, updated);
    } catch (err) {
      console.error("Erro ao mover tarefa", err);
      alert("Erro ao mover tarefa!");
    }
  };

  return (
    <>
      <Container>
        {/* ✅ Tudo dentro do DragDropContext */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <TaskToBoard
            tasks={tasks}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </DragDropContext>
      </Container>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrEditTask}
        status={selectedStatus}
        task={selectedTask}
      />
    </>
  );
}

export default Board;
