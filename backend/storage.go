package main

import (
	"encoding/json"
	"fmt"
	"os"
)

const (
	boardsFile = "data/boards.json"
	tasksFile = "data/tasks.json"
	usersFile = "data/users.json"

)

// ========== TASKS ==========

func saveTasks() error {
	file, err := os.Create(tasksFile)
	if err != nil {
		return fmt.Errorf("erro ao criar arquivo: %v", err)
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	return encoder.Encode(tasks)
}

func loadTasks() error {
	file, err := os.Open(tasksFile)
	if err != nil {
		if os.IsNotExist(err) {
			return nil
		}
		return fmt.Errorf("erro ao abrir arquivo: %v", err)
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	return decoder.Decode(&tasks)
}

// ========== BOARDS ==========

func saveBoards() error {
	file, err := os.Create(boardsFile)
	if err != nil {
		return fmt.Errorf("erro ao criar arquivo de boards: %v", err)
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	return encoder.Encode(boards)
}

func loadBoards() error {
	file, err := os.Open(boardsFile)
	if err != nil {
		if os.IsNotExist(err) {
			return nil
		}
		return fmt.Errorf("erro ao abrir arquivo de boards: %v", err)
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	return decoder.Decode(&boards)
}

// ========== USERS ==========

func saveUsers() error {
	file, err := os.Create(usersFile)
	if err != nil {
		return fmt.Errorf("erro ao criar arquivo de usuários: %v", err)
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	return encoder.Encode(users)
}

func loadUsers() error {
	file, err := os.Open(usersFile)
	if err != nil {
		if os.IsNotExist(err) {
			return nil
		}
		return fmt.Errorf("erro ao abrir arquivo de usuários: %v", err)
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	return decoder.Decode(&users)
}