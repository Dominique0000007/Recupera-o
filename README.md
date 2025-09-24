# Projeto de Recuperação — Atividades (Frontend e Backend)

Este repositório contém as atividades de recuperação, incluindo um projeto completo de Cadastro (Atividade-3) com frontend em React (Vite) e backend em Java (Spring Boot, Maven).

## Sumário
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como rodar — Atividade-3 (Cadastro)](#como-rodar-—-atividade-3-cadastro)
  - [Backend (Java, Spring Boot)](#backend-java-spring-boot)
  - [Frontend (React, Vite)](#frontend-react-vite)
- [Endpoints da API (Atividade-3)](#endpoints-da-api-atividade-3)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Dicas e solução de problemas](#dicas-e-solução-de-problemas)

---

## Tecnologias
- Frontend: React 19 + Vite
- Backend: Java 17 + Spring Boot 3 (Maven)
- Banco: H2 (em memória)
- Estilo: CSS/Tailwind (opcional)

## Pré-requisitos
- Node.js LTS (para o frontend)
- Java 17 (JDK 17)
- Maven 3.9+
- Git (para versionamento)

## Estrutura do projeto
A estrutura principal das atividades está dentro da pasta `recuperção/`.

```
recuperção/
  Atividade-1/
  Atividade-2/
  Atividade-3/
    Cadastro-front/        # Frontend (Vite + React)
    Cadastro-Back/         # Backend (Spring Boot + Maven)
  Atividade-4/
  Atividade-5/
  Atividade-6/
```

> Observação: Existem pastas com nomes parecidos ("recuperção" e "recuperação"). Utilize sempre a pasta `recuperção/` como fonte de verdade do projeto.

---

## Como rodar — Atividade-3 (Cadastro)

### Backend (Java, Spring Boot)
Diretório: `recuperção/Atividade-3/Cadastro-Back/`

1. Instalar dependências e compilar:
   ```bash
   mvn clean install
   ```
2. Subir a aplicação:
   ```bash
   mvn spring-boot:run
   ```
3. A API ficará disponível em: `http://localhost:3001`
4. Console do H2 (opcional): `http://localhost:3001/h2-console`
   - JDBC URL: `jdbc:h2:mem:cadastrodb`
   - User: `sa`
   - Password: (vazio)

### Frontend (React, Vite)
Diretório: `recuperção/Atividade-3/Cadastro-front/`

1. Instalar dependências:
   ```bash
   npm install
   ```
2. Rodar em desenvolvimento:
   ```bash
   npm run dev
   ```
3. Abrir a URL informada pelo Vite (geralmente `http://localhost:5173`).

---

## Endpoints da API (Atividade-3)
Base URL: `http://localhost:3001`

- `GET /api/users` — Lista usuários
- `POST /api/users` — Cadastra usuário
  - Body JSON: `{ "nome": "string", "email": "string" }`
- `PUT /api/users/{id}` — Atualiza usuário
  - Body JSON parcial: `{ "nome": "string?", "email": "string?" }`
- `DELETE /api/users/{id}` — Remove usuário

Respostas de erro seguem HTTP status (`400`, `404`, etc.).

---

## Variáveis de ambiente
Frontend (Vite):
- `VITE_API_URL` — URL da API. Padrão: `http://localhost:3001`.

Exemplo de `.env` no frontend:
```
VITE_API_URL=http://localhost:3001
```

---

## Dicas e solução de problemas
- **Portas ocupadas**: se `3001` (API) ou `5173` (Vite) estiverem ocupadas, feche a outra aplicação ou ajuste as portas.
- **CORS**: o backend já está com CORS liberado globalmente para desenvolvimento.
- **Banco H2**: os dados são mantidos em memória (somem ao reiniciar). Para persistência, é necessário configurar um banco real (ex.: PostgreSQL) e ajustar o `application.properties`.
- **Git remoto**: garanta que o remoto esteja correto:
  ```bash
  git remote set-url origin https://github.com/Dominique0000007/recupera-o.git
  ```
- **Commit inicial**: se aparecer `src refspec main does not match any`, faça um commit antes do push:
  ```bash
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git push -u origin main
  ```

---

Feito com ❤️ para a recuperação.
