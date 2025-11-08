package main

import (
	"encoding/json"
	"fmt"
	"os"
)

// Caminho do arquivo local
const tasksFile = "tasks.json"

// Salva as tarefas no arquivo JSON
func saveTasks() error {
	file, err := os.Create(tasksFile)
	if err != nil {
		return fmt.Errorf("erro ao criar arquivo: %v", err)
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	return encoder.Encode(tasks)
}

// Carrega as tarefas do arquivo JSON (se existir)
func loadTasks() error {
	file, err := os.Open(tasksFile)
	if err != nil {
		if os.IsNotExist(err) {
			return nil // sem arquivo ainda, tudo bem
		}
		return fmt.Errorf("erro ao abrir arquivo: %v", err)
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	return decoder.Decode(&tasks)
}
