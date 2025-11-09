package main

import (
	"encoding/json"
	"fmt"
	"os"
)

const (
	tasksFile  = "tasks.json"
	boardsFile = "boards.json"
)

// Salva as tarefas no arquivo JSON
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

// Carrega as tarefas do arquivo JSON
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

// Salva os boards no arquivo JSON
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

// Carrega os boards do arquivo JSON
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