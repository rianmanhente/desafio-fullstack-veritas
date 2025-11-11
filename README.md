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

🧠 Decisões Técnicas
Como pedido no desafio , projeto em React com backend em go .

# Frontend
Escolhi utlizar o Vite para o react , pois oferece hot reload extremamente rápido e configs simplificadas .
Usei o typescript para garantir maior segurança de tipos , prevenindo erros em tempo de compilação e tornando o código mais legível e previsível .
Styled Components permite criar componentes já encapsulados com seus estilos, o que considero mais prático do que trabalhar com HTML e CSS separados. Além disso, já tenho familiaridade com essa biblioteca e prefiro evitar a criação manual de classes CSS."
Axios , padrao para se conectar com o backend e o React Router DOM para gerenciar rotas . 

Adotei uma abordagem altamente componentizada, dividindo a interface em componentes pequenos e reutilizáveis. Essa estratégia proporciona maior clareza no código, facilita a manutenção, acelera o desenvolvimento de novas features e garante consistência visual em toda a aplicação

----

# Backend

A implementação do backend seguiu uma abordagem direta e funcional:

- **Bibliotecas padrão**: `net/http` para servidor HTTP e `encoding/json` para serialização
- **Autenticação JWT**: Tokens stateless para controle de sessão
- **UUID**: Identificadores únicos e seguros para entidades
- **Persistência**: Dados armazenados em arquivos JSON
- **API RESTful**: Endpoints claros e bem documentados

Para organizar a comunicação entre camadas, foi criada uma pasta `services` no frontend que centraliza todas as requisições HTTP, promovendo: Separação de responsabilidades ,Reutilização de código, Facilidade de manutenção e Ponto único para configuração de APIs

----

# Limitações Conhecidas

-- Persistência baseada em arquivos JSON

Toda a lógica de dados depende de arquivos (boards.json, tasks.json, users.json).

Não há controle de concorrência (dois usuários salvando ao mesmo tempo podem sobrescrever dados).

Não existe persistência transacional , se o servidor cair durante uma gravação, o JSON pode corromper.

A escalabilidade é praticamente nula , essa estrutura só suporta um pequeno número de usuários/tarefas.

🧩 Melhoria futura: migrar para um banco relacional (PostgreSQL) por exemmplo e usar uma camada ORM/SQL builder (como GORM).

-- Ausência de testes

Não há nenhum diretório __tests__, *_test.go ou configuração de Jest no frontend.
Isso significa que o projeto ainda não tem testes unitários ou de integração — o que é tranquilo num desafio, mas limita a manutenção.

🧩 Melhoria futura:

No backend usar testing nativo do Go para testar endpoints e regras de negócio.

No frontend usar React Testing Library e Jest para validar componentes e interações.

--Falta de estado global ou gerenciamento complexo

No frontend, não coloquei nenhuma pasta store/, context/ ou biblioteca como Zustand ou Redux.
Isso sugere que:

O estado das tarefas e colunas é sendo mantido localmente (em useState ou useEffect).

Isso é funcional, mas limita a comunicação entre componentes e a escalabilidade da UI (ex: múltiplos quadros, usuários, sincronização em tempo real).

🧩 Melhoria futura:
Adicionar Context API, Zustand ou Redux Toolkit para gerenciar o estado global do Kanban

--Comunicação e tratamento de erros

No backend, como há apenas handlers.go, os endpoints estao retornando erros genéricos sem códigos de status detalhados

Não tem middleware de autenticação ou logging estruturado.

🧩 Melhoria futura:

Criar middleware para autenticação JWT e logging de requisições.

Retornar mensagens de erro padronizadas em JSON (status, message, error_code

--Backend não modularizado para múltiplos ambientes

Não há a .env ou configuração de variáveis de ambiente no backend (ex: porta, secret JWT, caminhos de arquivos JSON).
Isso torna o deploy menos flexível.

🧩 Melhoria futura:
Usar pacotes como github.com/joho/godotenv ou variáveis de ambiente para configurar:

Porta do servidor

Caminhos de armazenamento

Chave JWT

## 📝 Licença

Este projeto foi desenvolvido como parte do Desafio Fullstack Veritas.

---

## 👤 Autor

**Rian Manhente**

- GitHub: [@rianmanhente](https://github.com/rianmanhente)
