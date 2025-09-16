const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: '1',
    title: 'Aprender React',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Criar API REST',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Conectar Frontend e Backend',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

app.get('/api/tasks', (req, res) => {
  try {
    res.json({
      success: true,
      data: tasks,
      message: 'Tarefas carregadas com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao carregar tarefas',
      error: error.message
    });
  }
});

app.post('/api/tasks', (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Título da tarefa é obrigatório'
      });
    }
    
    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    
    res.status(201).json({
      success: true,
      data: newTask,
      message: 'Tarefa criada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar tarefa',
      error: error.message
    });
  }
});

app.patch('/api/tasks/:id/toggle', (req, res) => {
  try {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Tarefa não encontrada'
      });
    }
    
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    
    res.json({
      success: true,
      data: tasks[taskIndex],
      message: 'Status da tarefa alterado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao alterar status da tarefa',
      error: error.message
    });
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Tarefa não encontrada'
      });
    }
    
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    
    res.json({
      success: true,
      data: deletedTask,
      message: 'Tarefa deletada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar tarefa',
      error: error.message
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando!',
    timestamp: new Date().toISOString(),
    totalTasks: tasks.length
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 API disponível em: http://localhost:${PORT}/api`);
});