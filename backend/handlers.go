package main

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/google/uuid"
)

// "Banco de dados" em memória
var (
	tasks  = []Task{}
	boards = []Board{}
)

// ========== BOARDS HANDLERS ==========

// GetBoardsHandler retorna todos os boards
func GetBoardsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(boards)
}

// CreateBoardHandler cria um novo board
func CreateBoardHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    var newBoard Board
    if err := json.NewDecoder(r.Body).Decode(&newBoard); err != nil {
        http.Error(w, "JSON inválido", http.StatusBadRequest)
        return
    }

    if err := newBoard.Validate(); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    //  Validação: nome único (case-insensitive)
    newName := strings.TrimSpace(strings.ToLower(newBoard.Name))
    for _, b := range boards {
        if strings.ToLower(b.Name) == newName {
            http.Error(w, "já existe um board com esse nome", http.StatusBadRequest)
            return
        }
    }

    newBoard.ID = uuid.New().String()
    newBoard.CreatedAt = time.Now()
    newBoard.UpdatedAt = time.Now()

    boards = append(boards, newBoard)

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(newBoard)
}

// UpdateBoardHandler atualiza um board existente
func UpdateBoardHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	pathParts := strings.Split(r.URL.Path, "/")
	if len(pathParts) < 3 {
		http.Error(w, "ID não fornecido", http.StatusBadRequest)
		return
	}
	id := pathParts[2]

	var updatedBoard Board
	if err := json.NewDecoder(r.Body).Decode(&updatedBoard); err != nil {
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}

	if err := updatedBoard.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	found := false
	for i, board := range boards {
		if board.ID == id {
			boards[i].Name = updatedBoard.Name
			boards[i].UpdatedAt = time.Now()
			
			json.NewEncoder(w).Encode(boards[i])
			found = true
			break
		}
	}

	if !found {
		http.Error(w, "Board não encontrado", http.StatusNotFound)
	}
}

// DeleteBoardHandler deleta um board e todas as suas tarefas
func DeleteBoardHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	pathParts := strings.Split(r.URL.Path, "/")
	if len(pathParts) < 3 {
		http.Error(w, "ID não fornecido", http.StatusBadRequest)
		return
	}
	id := pathParts[2]

	found := false
	for i, board := range boards {
		if board.ID == id {
			// Remove o board
			boards = append(boards[:i], boards[i+1:]...)
			
			// Remove todas as tarefas associadas ao board
			newTasks := []Task{}
			for _, task := range tasks {
				if task.BoardID != id {
					newTasks = append(newTasks, task)
				}
			}
			tasks = newTasks
			
			found = true
			break
		}
	}

	if !found {
		http.Error(w, "Board não encontrado", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// ========== TASKS HANDLERS ==========

// GetTasksHandler retorna todas as tarefas (ou filtra por boardId)
func GetTasksHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	// Filtrar por boardId se fornecido na query string
	boardID := r.URL.Query().Get("boardId")
	
	if boardID != "" {
		filteredTasks := []Task{}
		for _, task := range tasks {
			if task.BoardID == boardID {
				filteredTasks = append(filteredTasks, task)
			}
		}
		json.NewEncoder(w).Encode(filteredTasks)
		return
	}
	
	json.NewEncoder(w).Encode(tasks)
}

// CreateTaskHandler cria uma nova tarefa
func CreateTaskHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var newTask Task
	if err := json.NewDecoder(r.Body).Decode(&newTask); err != nil {
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}

	// 🔸 Verificar se o boardId foi fornecido
	if strings.TrimSpace(newTask.BoardID) == "" {
		http.Error(w, "boardId é obrigatório - a tarefa deve pertencer a um board", http.StatusBadRequest)
		return
	}

	// 🔸 Verificar se o board existe
	boardExists := false
	for _, board := range boards {
		if board.ID == newTask.BoardID {
			boardExists = true
			break
		}
	}

	if !boardExists {
		http.Error(w, "Board não encontrado - forneça um boardId válido", http.StatusNotFound)
		return
	}

	// Validar campos obrigatórios e status
	if err := newTask.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// 🔍 Verificar se já existe uma tarefa com o mesmo título neste board
	newTitle := strings.TrimSpace(strings.ToLower(*newTask.Title))
	for _, t := range tasks {
		if t.BoardID == newTask.BoardID && strings.ToLower(*t.Title) == newTitle {
			http.Error(w, "já existe uma tarefa com esse título neste board", http.StatusBadRequest)
			return
		}
	}

	// ✅ Criar nova tarefa
	newTask.ID = uuid.New().String()
	newTask.CreatedAt = time.Now()
	newTask.UpdatedAt = time.Now()

	tasks = append(tasks, newTask)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newTask)
}


// UpdateTaskHandler atualiza uma tarefa existente
func UpdateTaskHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	pathParts := strings.Split(r.URL.Path, "/")
	if len(pathParts) < 3 {
		http.Error(w, "ID não fornecido", http.StatusBadRequest)
		return
	}
	id := pathParts[2]

	var updatedTask Task
	if err := json.NewDecoder(r.Body).Decode(&updatedTask); err != nil {
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}

	if err := updatedTask.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	found := false
	for i, task := range tasks {
		if task.ID == id {
			tasks[i].BoardID = updatedTask.BoardID
			tasks[i].Title = updatedTask.Title
			tasks[i].Description = updatedTask.Description
			tasks[i].Status = updatedTask.Status
			tasks[i].UpdatedAt = time.Now()
			
			json.NewEncoder(w).Encode(tasks[i])
			found = true
			break
		}
	}

	if !found {
		http.Error(w, "Tarefa não encontrada", http.StatusNotFound)
	}
}

// DeleteTaskHandler deleta uma tarefa
func DeleteTaskHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	pathParts := strings.Split(r.URL.Path, "/")
	if len(pathParts) < 3 {
		http.Error(w, "ID não fornecido", http.StatusBadRequest)
		return
	}
	id := pathParts[2]

	found := false
	for i, task := range tasks {
		if task.ID == id {
			tasks = append(tasks[:i], tasks[i+1:]...)
			found = true
			break
		}
	}

	if !found {
		http.Error(w, "Tarefa não encontrada", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}