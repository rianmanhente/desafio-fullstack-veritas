package main

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/google/uuid"
)

// "Banco de dados" em memória
var tasks = []Task{}

// GetTasksHandler retorna todas as tarefas
func GetTasksHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
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

	// Validar tarefa
	if err := newTask.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Gerar ID e timestamps
	newTask.ID = uuid.New().String()
	newTask.CreatedAt = time.Now()
	newTask.UpdatedAt = time.Now()

	// Adicionar ao "banco"
	tasks = append(tasks, newTask)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newTask)
}

// UpdateTaskHandler atualiza uma tarefa existente
func UpdateTaskHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Extrair ID da URL: /tasks/123
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

	// Validar tarefa
	if err := updatedTask.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Buscar e atualizar tarefa
	found := false
	for i, task := range tasks {
		if task.ID == id {
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

	// Extrair ID da URL
	pathParts := strings.Split(r.URL.Path, "/")
	if len(pathParts) < 3 {
		http.Error(w, "ID não fornecido", http.StatusBadRequest)
		return
	}
	id := pathParts[2]

	// Buscar e deletar tarefa
	found := false
	for i, task := range tasks {
		if task.ID == id {
			// Remove do slice
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