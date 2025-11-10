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
	users  = []User{}
)

// ========== BOARDS HANDLERS ==========

func GetBoardsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(boards)
}

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
			boards = append(boards[:i], boards[i+1:]...)

			// Remove tasks associadas a esse board
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

func GetTasksHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

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

func CreateTaskHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var newTask Task
	if err := json.NewDecoder(r.Body).Decode(&newTask); err != nil {
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(newTask.BoardID) == "" {
		http.Error(w, "boardId é obrigatório - a tarefa deve pertencer a um board", http.StatusBadRequest)
		return
	}

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

	if err := newTask.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	newTitle := strings.TrimSpace(strings.ToLower(*newTask.Title))
	for _, t := range tasks {
		if t.BoardID == newTask.BoardID && strings.ToLower(*t.Title) == newTitle {
			http.Error(w, "já existe uma tarefa com esse título neste board", http.StatusBadRequest)
			return
		}
	}

	newTask.ID = uuid.New().String()
	newTask.CreatedAt = time.Now()
	newTask.UpdatedAt = time.Now()

	tasks = append(tasks, newTask)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newTask)
}

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

// ========== USER HANDLERS ==========

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var newUser User
	if err := json.NewDecoder(r.Body).Decode(&newUser); err != nil {
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}

	if err := newUser.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	newEmail := strings.TrimSpace(strings.ToLower(newUser.Email))
	for _, u := range users {
		if strings.ToLower(u.Email) == newEmail {
			http.Error(w, "este email já está cadastrado", http.StatusBadRequest)
			return
		}
	}

	newUser.ID = uuid.New().String()
	newUser.Email = strings.TrimSpace(newUser.Email)
	newUser.Name = strings.TrimSpace(newUser.Name)
	newUser.CreatedAt = time.Now()
	newUser.UpdatedAt = time.Now()

	users = append(users, newUser)

	// 🔑 Gera token JWT após cadastro
	token, err := GenerateToken(newUser.ID, newUser.Email)
	if err != nil {
		http.Error(w, "erro ao gerar token", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "usuário cadastrado com sucesso",
		"user":    newUser.ToResponse(),
		"token":   token,
	})
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var loginReq LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&loginReq); err != nil {
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(loginReq.Email) == "" {
		http.Error(w, "o email é obrigatório", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(loginReq.Password) == "" {
		http.Error(w, "a senha é obrigatória", http.StatusBadRequest)
		return
	}

	email := strings.TrimSpace(strings.ToLower(loginReq.Email))
	var foundUser *User
	for i := range users {
		if strings.ToLower(users[i].Email) == email {
			foundUser = &users[i]
			break
		}
	}

	if foundUser == nil {
		http.Error(w, "email ou senha incorretos", http.StatusUnauthorized)
		return
	}

	if foundUser.Password != loginReq.Password {
		http.Error(w, "email ou senha incorretos", http.StatusUnauthorized)
		return
	}

	// ✅ Gerar o token JWT
	token, err := GenerateToken(foundUser.ID, foundUser.Email)
	if err != nil {
		http.Error(w, "erro ao gerar token", http.StatusInternalServerError)
		return
	}

	// ✅ Retornar o token junto da mensagem e do usuário
	response := map[string]interface{}{
		"message": "login realizado com sucesso",
		"user":    foundUser.ToResponse(),
		"token":   token,
	}

	json.NewEncoder(w).Encode(response)
}



func GetUsersHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	usersResponse := make([]UserResponse, len(users))
	for i, user := range users {
		usersResponse[i] = user.ToResponse()
	}

	json.NewEncoder(w).Encode(usersResponse)
}
