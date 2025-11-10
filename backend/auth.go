package main

import (
	"time"
	"github.com/golang-jwt/jwt/v5"
)

// Segredo usado para assinar o token (ideal guardar em variável de ambiente)
var jwtSecret = []byte("chave-super-secreta")

// Claims define o payload do JWT
type Claims struct {
	UserID string `json:"userId"`
	Email  string `json:"email"`
	jwt.RegisteredClaims
}

// Função que gera o token JWT
func GenerateToken(userID, email string) (string, error) {
	// Define o tempo de expiração (exemplo: 24h)
	expirationTime := time.Now().Add(24 * time.Hour)

	claims := &Claims{
		UserID: userID,
		Email:  email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "backend-kanban",
		},
	}

	// Cria o token assinado
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

// Função que valida o token JWT recebido
func ValidateToken(tokenString string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	}

	return nil, jwt.ErrSignatureInvalid
}
