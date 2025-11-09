package main

import (
	"errors"
	"strings"
	"time"
)

// Board representa um quadro Kanban
type Board struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

// Task representa uma tarefa no Kanban
type Task struct {
	ID          string    `json:"id"`
	BoardID     string    `json:"boardId"` // 🔸 Nova propriedade
	Title       *string   `json:"title"`
	Description *string   `json:"description"`
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
			return s, true
		}
	}
	return "", false
}

func (b *Board) Validate() error {
	if strings.TrimSpace(b.Name) == "" {
		return errors.New("o nome do board é obrigatório")
	}
	return nil
}

func (t *Task) Validate() error {
	// 🔸 BoardID obrigatório
	if strings.TrimSpace(t.BoardID) == "" {
		return errors.New("o boardId é obrigatório")
	}

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