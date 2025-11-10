package main

import (
	"fmt"
	"log"
	"net/http"
)

func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

// Router para /boards
func boardsRouter(w http.ResponseWriter, r *http.Request) {
	switch {
	case r.Method == "GET" && r.URL.Path == "/boards":
		GetBoardsHandler(w, r)
		return

	case r.Method == "POST" && r.URL.Path == "/boards":
		CreateBoardHandler(w, r)
		saveBoards()
		return

	case r.Method == "PUT" && len(r.URL.Path) > len("/boards/"):
		UpdateBoardHandler(w, r)
		saveBoards()
		return

	case r.Method == "DELETE" && len(r.URL.Path) > len("/boards/"):
		DeleteBoardHandler(w, r)
		saveBoards()
		saveTasks() // Salva tasks também pois podem ter sido deletadas
		return

	default:
		http.Error(w, "Rota não encontrada", http.StatusNotFound)
	}
}

// Router para /tasks
func tasksRouter(w http.ResponseWriter, r *http.Request) {
	switch {
	case r.Method == "GET" && r.URL.Path == "/tasks":
		GetTasksHandler(w, r)
		return

	case r.Method == "POST" && r.URL.Path == "/tasks":
		CreateTaskHandler(w, r)
		saveTasks()
		return

	case r.Method == "PUT" && len(r.URL.Path) > len("/tasks/"):
		UpdateTaskHandler(w, r)
		saveTasks()
		return

	case r.Method == "DELETE" && len(r.URL.Path) > len("/tasks/"):
		DeleteTaskHandler(w, r)
		saveTasks()
		return

	default:
		http.Error(w, "Rota não encontrada", http.StatusNotFound)
	}
}

// Router para /auth (autenticação)
func authRouter(w http.ResponseWriter, r *http.Request) {
	switch {
	case r.Method == "POST" && r.URL.Path == "/auth/register":
		RegisterHandler(w, r)
		saveUsers()
		return

	case r.Method == "POST" && r.URL.Path == "/auth/login":
		LoginHandler(w, r)
		return

	case r.Method == "GET" && r.URL.Path == "/auth/users":
		GetUsersHandler(w, r)
		return

	default:
		http.Error(w, "Rota não encontrada", http.StatusNotFound)
	}
}

func main() {
	// Carrega boards, tasks e usuários
	if err := loadBoards(); err != nil {
		fmt.Println("⚠️ Erro ao carregar boards:", err)
	} else {
		fmt.Println("✅ Boards carregados com sucesso.")
	}

	if err := loadTasks(); err != nil {
		fmt.Println("⚠️ Erro ao carregar tasks:", err)
	} else {
		fmt.Println("✅ Tasks carregadas com sucesso.")
	}

	if err := loadUsers(); err != nil {
		fmt.Println("⚠️ Erro ao carregar usuários:", err)
	} else {
		fmt.Println("✅ Usuários carregados com sucesso.")
	}

	// Configurar rotas
	http.HandleFunc("/boards", enableCORS(boardsRouter))
	http.HandleFunc("/boards/", enableCORS(boardsRouter))
	http.HandleFunc("/tasks", enableCORS(tasksRouter))
	http.HandleFunc("/tasks/", enableCORS(tasksRouter))
	http.HandleFunc("/auth/", enableCORS(authRouter))

	http.HandleFunc("/health", enableCORS(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"status":"ok"}`)
	}))

	port := ":8080"
	fmt.Printf("🚀 Servidor rodando em http://localhost%s\n", port)
	fmt.Println("Endpoints disponíveis:")
	fmt.Println("  📋 BOARDS:")
	fmt.Println("    GET    /boards      - Listar boards")
	fmt.Println("    POST   /boards      - Criar board")
	fmt.Println("    PUT    /boards/:id  - Atualizar board")
	fmt.Println("    DELETE /boards/:id  - Deletar board")
	fmt.Println("  ✅ TASKS:")
	fmt.Println("    GET    /tasks?boardId=xxx - Listar tarefas (filtrado por board)")
	fmt.Println("    POST   /tasks      - Criar tarefa")
	fmt.Println("    PUT    /tasks/:id  - Atualizar tarefa")
	fmt.Println("    DELETE /tasks/:id  - Deletar tarefa")
	fmt.Println("  🔐 AUTH:")
	fmt.Println("    POST   /auth/register - Cadastrar usuário")
	fmt.Println("    POST   /auth/login    - Login de usuário")
	fmt.Println("    GET    /auth/users    - Listar usuários")
	fmt.Println("  🏥 HEALTH:")
	fmt.Println("    GET    /health     - Health check")

	log.Fatal(http.ListenAndServe(port, nil))
}