package main

import (
	"errors"
	"strings"
	"time"
)

// Task representa uma tarefa no Kanban
type Task struct {
	ID          string    `json:"id"`
	Title       *string    `json:"title"`
	Description *string    `json:"description"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

// Status válidos (forma padrão)
var validStatuses = []string{
	"A Fazer",
	"Em Progresso",
	"Concluídas",
}

// Função que retorna o status padronizado, se for válido
func NormalizeStatus(status string) (string, bool) {
	for _, s := range validStatuses {
		if strings.EqualFold(s, status) {
			return s, true // retorna o nome padronizado (ex: "A Fazer")
		}
	}
	return "", false
}

func (t *Task) Validate() error {
	// 🔸 Título obrigatório
	if t.Title == nil || strings.TrimSpace(*t.Title) == "" {
		return errors.New("o título é obrigatório")
	}

	// 🔸 Define status padrão
	if t.Status == "" {
		t.Status = "A Fazer"
	}

	// 🔸 Normaliza status se válido
	if normalized, ok := NormalizeStatus(t.Status); ok {
		t.Status = normalized
	} else {
		return errors.New("status inválido. Use: A Fazer, Em Progresso ou Concluídas")
	}

	return nil
}
