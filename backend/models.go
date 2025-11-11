package main

import (
	"errors"
	"strings"
	"time"
)

// ========== BOARD ==========

// Board representa um quadro Kanban
type Board struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func (b *Board) Validate() error {
	if strings.TrimSpace(b.Name) == "" {
		return errors.New("o nome do board é obrigatório")
	}
	return nil
}

// ========== TASK ==========

// Task representa uma tarefa no Kanban
type Task struct {
	ID          string    `json:"id"`
	BoardID     string    `json:"boardId"`
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

func (t *Task) Validate() error {
	if strings.TrimSpace(t.BoardID) == "" {
		return errors.New("o boardId é obrigatório")
	}

	if t.Title == nil || strings.TrimSpace(*t.Title) == "" {
		return errors.New("o título é obrigatório")
	}

	if t.Status == "" {
		t.Status = "A Fazer"
	}

	if normalized, ok := NormalizeStatus(t.Status); ok {
		t.Status = normalized
	} else {
		return errors.New("status inválido. Use: A Fazer, Em Progresso ou Concluídas")
	}

	return nil
}

// ========== USER ==========

// User representa um usuário do sistema
type User struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Password  string    `json:"password,omitempty"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

// UserResponse representa a resposta de usuário (sem senha)
type UserResponse struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

// LoginRequest representa os dados de login
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// LoginResponse representa a resposta do login
type LoginResponse struct {
	Message string       `json:"message"`
	User    UserResponse `json:"user"`
}

func (u *User) Validate() error {
	if strings.TrimSpace(u.Name) == "" {
		return errors.New("o nome é obrigatório")
	}

	if strings.TrimSpace(u.Email) == "" {
		return errors.New("o email é obrigatório")
	}

	if !strings.Contains(u.Email, "@") || !strings.Contains(u.Email, ".") {
		return errors.New("email inválido")
	}

	if strings.TrimSpace(u.Password) == "" {
		return errors.New("a senha é obrigatória")
	}

	if len(u.Password) < 6 {
		return errors.New("a senha deve ter pelo menos 6 caracteres")
	}

	return nil
}

func (u *User) ToResponse() UserResponse {
	return UserResponse{
		ID:        u.ID,
		Name:      u.Name,
		Email:     u.Email,
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
	}
}