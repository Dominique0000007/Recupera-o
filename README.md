# Pasta de Recuperação — Visão Geral e Guia de Execução

Este diretório reúne as atividades de recuperação. Abaixo você encontra um resumo do que há em cada atividade, tecnologias usadas e como executar os projetos.

Sumário
- [Estrutura de pastas](#estrutura-de-pastas)
- [Pré-requisitos](#pré-requisitos)
- [Atividade 2 — App React (Create React App)](#atividade-2-—-app-react-create-react-app)
- [Atividade 3 — Cadastro (Frontend React + Backend Java Spring Boot)](#atividade-3-—-cadastro-frontend-react--backend-java-spring-boot)
- [Atividade 4 — Netflix (React + Vite + Tailwind)](#atividade-4-—-netflix-react--vite--tailwind)
- [Atividade 5 — Lista (React Native + Expo)](#atividade-5-—-lista-react-native--expo)
- [Atividade 6 — Site estático com SASS](#atividade-6-—-site-estático-com-sass)
- [Dicas gerais](#dicas-gerais)

---

## Estrutura de pastas
```
recuperação/
  Atividade-2/
    public/
    src/
    package.json
    yarn.lock
  Atividade-3/
    Cadastro-front/
      index.html
      src/
      package.json
    Cadastro-Back/
      pom.xml
      src/
      src/main/resources/application.properties
  Atividade-4/
    Netflix/
      package.json
      vite.config.js
      tailwind.config.js
      src/
  Atividade-5/
    package.json
    App.tsx
    app.json
    tsconfig.json
  Atividade-6/
    index.html
    sass/
    package.json
```

---

## Pré-requisitos
- Node.js LTS (para projetos React/Vite e SASS)
- Yarn (recomendado para Atividade-2) ou NPM
- Java 17 (JDK 17) e Maven 3.9+ (para o backend da Atividade-3)
- Expo CLI (para a Atividade-5): `npm i -g expo-cli` (ou use os scripts do Expo sem instalar globalmente)

---

## Atividade 2 — App React (Create React App)
Diretório: `recuperação/Atividade-2/`

Scripts (conforme `package.json`):
- Desenvolvimento:
  ```bash
  yarn start
  # ou
  npm start
  ```
- Build de produção:
  ```bash
  yarn build
  # ou
  npm run build
  ```
- Testes:
  ```bash
  yarn test
  # ou
  npm test
  ```

Abrir no navegador: `http://localhost:3000`

---

## Atividade 3 — Cadastro (Frontend React + Backend Java Spring Boot)
Diretório: `recuperação/Atividade-3/`

### Backend (Java, Spring Boot)
- Pasta: `recuperação/Atividade-3/Cadastro-Back/`
- Arquivo: `pom.xml`
- Propriedades importantes: `src/main/resources/application.properties`
  - Porta padrão: `3001`
  - Banco H2 em memória habilitado

Como rodar:
```bash
cd recuperação/Atividade-3/Cadastro-Back
mvn clean install
mvn spring-boot:run
```
API disponível em: `http://localhost:3001`

Console H2 (opcional): `http://localhost:3001/h2-console`
- JDBC URL: `jdbc:h2:mem:cadastrodb`
- Usuário: `sa`
- Senha: (vazia)

Rotas esperadas:
- `GET /api/users` — Lista usuários
- `POST /api/users` — Cadastra (`{ nome, email }`)
- `PUT /api/users/{id}` — Atualiza
- `DELETE /api/users/{id}` — Remove

### Frontend (React)
- Pasta: `recuperação/Atividade-3/Cadastro-front/`
- Arquivos: `index.html`, `src/`, `package.json`

Como rodar (Vite, se configurado):
```bash
cd recuperação/Atividade-3/Cadastro-front
npm install
npm run dev
```
Abrir a URL que o Vite informar (ex.: `http://localhost:5173`).

Variáveis de ambiente (opcional):
- `VITE_API_URL` — URL da API. Padrão: `http://localhost:3001`.

> Observação: Se o `package.json` do frontend estiver apontando para scripts de Node/Express, ajuste-o para um projeto Vite/React (ou me peça que eu ajuste automaticamente).

---

## Atividade 4 — Netflix (React + Vite + Tailwind)
Diretório: `recuperação/Atividade-4/Netflix/`

Scripts (conforme `package.json`):
```bash
npm install
npm run dev     # desenvolvimento (Vite)
# ou
npm start       # alias para vite
npm run build   # build de produção
npm run preview # pré-visualização do build
```

Dependências principais:
- React 19, Vite 7, Tailwind CSS 4

---

## Atividade 5 — Lista (React Native + Expo)
Diretório: `recuperação/Atividade-5/`

Scripts (conforme `package.json`):
```bash
npm install
npm run start    # inicia o Expo
npm run android  # abre no Android
npm run ios      # abre no iOS (macOS)
npm run web      # abre no navegador
```

Dependências principais:
- Expo 51, React Native 0.74, navegação (`@react-navigation/*`), Paper, Gesture Handler, etc.

---

## Atividade 6 — Site estático com SASS
Diretório: `recuperação/Atividade-6/`

Scripts:
- Instalar dependências (SASS):
  ```bash
  npm install
  ```
- Se houver script de build de SASS, rode-o. Caso contrário, você pode compilar manualmente:
  ```bash
  npx sass sass:dist --watch
  ```
- Abra `index.html` no navegador (via Live Server ou similar).

---

## Dicas gerais
- Execute os comandos sempre dentro da pasta do projeto correspondente.
- Se uma porta estiver ocupada, ajuste a porta no `application.properties` (backend) ou use a flag `--port` do Vite.
- Para problemas de CORS no desenvolvimento, o backend da Atividade-3 está configurado para permitir requisições do frontend.
- Para publicar no GitHub, na raiz do repositório, faça:
  ```bash
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git remote set-url origin https://github.com/SEU_USUARIO/SEU_REPO.git
  git push -u origin main
  ```
