# Desafio Fullstack Veritas

Aplicação fullstack completa com React no frontend e Go no backend.

---

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Frontend](#frontend)
- [Backend](#backend)

---

## 🔧 Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** (versão 20.19+ ou 22.12+)
- **npm** ou **yarn**
- **Go** (versão 1.25.4)
- **Git**

---

## 📥 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/rianmanhente/desafio-fullstack-veritas.git
cd desafio-fullstack-veritas
```

---

## 🎨 Frontend

Frontend desenvolvido em **React** com **TypeScript** e configurado com **Vite** para um ambiente rápido e moderno.

### Tecnologias Utilizadas

- [React](https://reactjs.org/) - Biblioteca para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [Vite](https://vitejs.dev/) - Build tool moderna e rápida
- [Axios](https://axios-http.com/) - Cliente HTTP
- [React Router DOM](https://reactrouter.com/) - Roteamento
- [SweetAlert2](https://sweetalert2.github.io/) - Alertas personalizados
- [Styled Components](https://styled-components.com/) - Estilização com CSS-in-JS

### Como executar

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

---

## ⚙️ Backend

Backend desenvolvido em **Go (Golang)**, responsável pela lógica de autenticação, controle de dados e integração com o frontend.

### Tecnologias Utilizadas

- [Go](https://go.dev/) - Linguagem principal (versão 1.25.4)
- [JWT (golang-jwt)](https://github.com/golang-jwt/jwt) - Autenticação e geração de tokens JWT
- [UUID (google/uuid)](https://github.com/google/uuid) - Geração de identificadores únicos
- [x/crypto](https://pkg.go.dev/golang.org/x/crypto) - Criptografia e hashing de senhas
- [net/http](https://pkg.go.dev/net/http) - Servidor HTTP nativo do Go
- [encoding/json](https://pkg.go.dev/encoding/json) - Manipulação de JSON

### Como executar

```bash
cd backend
go mod tidy
go run .
```

O backend estará disponível em `http://localhost:8080`

---

## 📝 Licença

Este projeto foi desenvolvido como parte do Desafio Fullstack Veritas.

---

## 👤 Autor

**Rian Manhente**

- GitHub: [@rianmanhente](https://github.com/rianmanhente)
