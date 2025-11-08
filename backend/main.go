package main

import (
	"fmt"
	"log"
	"net/http"
)

// Middleware CORS para permitir acesso do frontend
func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Requisição OPTIONS (pré-flight)
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

// Router manual para /tasks e /tasks/:id
func tasksRouter(w http.ResponseWriter, r *http.Request) {
	switch {
	case r.Method == "GET" && r.URL.Path == "/tasks":
		GetTasksHandler(w, r)
		return

	case r.Method == "POST" && r.URL.Path == "/tasks":
		CreateTaskHandler(w, r)
		// 💾 Salva as tarefas no arquivo após criar
		saveTasks()
		return

	case r.Method == "PUT" && len(r.URL.Path) > len("/tasks/"):
		UpdateTaskHandler(w, r)
		// 💾 Salva as tarefas no arquivo após atualizar
		saveTasks()
		return

	case r.Method == "DELETE" && len(r.URL.Path) > len("/tasks/"):
		DeleteTaskHandler(w, r)
		// 💾 Salva as tarefas no arquivo após deletar
		saveTasks()
		return

	default:
		http.Error(w, "Rota não encontrada", http.StatusNotFound)
	}
}

func main() {
	// 🔹 Carrega as tarefas do arquivo ao iniciar
	if err := loadTasks(); err != nil {
		fmt.Println("⚠️ Erro ao carregar tasks:", err)
	} else {
		fmt.Println("✅ Tasks carregadas do arquivo com sucesso.")
	}

	// Configurar rotas com CORS
	http.HandleFunc("/tasks", enableCORS(tasksRouter))
	http.HandleFunc("/tasks/", enableCORS(tasksRouter))

	// Health check
	http.HandleFunc("/health", enableCORS(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"status":"ok"}`)
	}))

	port := ":8080"
	fmt.Printf("🚀 Servidor rodando em http://localhost%s\n", port)
	fmt.Println("Endpoints disponíveis:")
	fmt.Println("  GET    /tasks      - Listar tarefas")
	fmt.Println("  POST   /tasks      - Criar tarefa")
	fmt.Println("  PUT    /tasks/:id  - Atualizar tarefa")
	fmt.Println("  DELETE /tasks/:id  - Deletar tarefa")
	fmt.Println("  GET    /health     - Health check")

	log.Fatal(http.ListenAndServe(port, nil))
}
