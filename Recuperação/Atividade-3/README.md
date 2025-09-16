# Atividade 3 - Frontend + Backend Conectados

## 📋 Descrição
Sistema completo de gerenciamento de tarefas com frontend React conectado a um backend Node.js/Express.

## 🚀 Como executar

### Backend (Porta 5000)
```bash
cd backend
npm install
npm start
```

### Frontend (Porta 3000)
```bash
cd frontend
npm install
npm start
```

## 🔧 Tecnologias
- **Backend**: Node.js, Express, CORS
- **Frontend**: React, Axios
- **Comunicação**: REST API

## 📡 Endpoints da API
- `GET /api/tasks` - Listar tarefas
- `POST /api/tasks` - Criar tarefa
- `PATCH /api/tasks/:id/toggle` - Alternar status
- `DELETE /api/tasks/:id` - Deletar tarefa
- `GET /api/health` - Status da API

## ✨ Funcionalidades
- ✅ Listar tarefas do backend
- ✅ Adicionar nova tarefa
- ✅ Marcar como concluída/pendente
- ✅ Deletar tarefa
- ✅ Interface responsiva
- ✅ Tratamento de erros
- ✅ Feedback visual
