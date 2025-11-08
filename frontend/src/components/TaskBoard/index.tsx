import TaskCard from "../TaskCard";
import AddTaskButton from "../AddTaskbutton";
import { BoardContainer, Column, ColumnTitle } from "./styles";
import type { Task } from "../../utils/typeTask";
import { Droppable, Draggable } from "@hello-pangea/dnd"; // 🧩 adicionado

const STATUSES: Task["status"][] = ["A Fazer", "Em Progresso", "Concluídas"];

interface TaskBoardProps {
  tasks: Task[];
  onAddTask: (status: Task["status"]) => void;
  onEditTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function TaskBoard({ tasks, onAddTask, onEditTask, onDeleteTask }: TaskBoardProps) {
  return (
    <BoardContainer>
      {STATUSES.map((status) => {
        const filteredTasks = tasks.filter((task) => task.status === status);

        return (
          <Droppable droppableId={status} key={status}>
            {(provided, snapshot) => (
              <Column
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: snapshot.isDraggingOver ? "#f0f0f0" : "transparent",
                  transition: "background 0.2s ease",
                }}
              >
                <ColumnTitle>{status}</ColumnTitle>

                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onEdit={onEditTask}
                            onDelete={onDeleteTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <p style={{ opacity: 0.5, fontStyle: "italic" }}>Sem tarefas</p>
                )}

                {provided.placeholder}
                <AddTaskButton status={status} onClick={onAddTask} />
              </Column>
            )}
          </Droppable>
        );
      })}
    </BoardContainer>
  );
}
