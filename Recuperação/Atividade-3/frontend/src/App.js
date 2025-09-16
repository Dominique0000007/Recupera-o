import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Carregar tarefas do backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data.data);
    } catch (err) {
      setError('Erro ao carregar tarefas. Verifique se o backend está rodando.');
      console.error('Erro ao carregar tarefas:', err);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar nova tarefa
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      setError('');
      const response = await axios.post(`${API_BASE_URL}/tasks`, {
        title: newTask.trim()
      });
      
      setTasks([...tasks, response.data.data]);
      setNewTask('');
      setSuccess('Tarefa adicionada com sucesso!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Erro ao adicionar tarefa.');
      console.error('Erro ao adicionar tarefa:', err);
    }
  };

  // Alternar status da tarefa
  const toggleTask = async (taskId) => {
    try {
      setError('');
      const response = await axios.patch(`${API_BASE_URL}/tasks/${taskId}/toggle`);
      
      setTasks(tasks.map(task => 
        task.id === taskId ? response.data.data : task
      ));
    } catch (err) {
      setError('Erro ao atualizar tarefa.');
      console.error('Erro ao atualizar tarefa:', err);
    }
  };

  // Deletar tarefa
  const deleteTask = async (taskId) => {
    try {
      setError('');
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
      
      setTasks(tasks.filter(task => task.id !== taskId));
      setSuccess('Tarefa removida com sucesso!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Erro ao remover tarefa.');
      console.error('Erro ao remover tarefa:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📋 Task Manager</h1>
          <p>Frontend + Backend Conectados</p>
        </header>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <form onSubmit={addTask} className="add-task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Digite uma nova tarefa..."
            className="task-input"
          />
          <button type="submit" className="add-button">
            ➕ Adicionar
          </button>
        </form>

        {loading ? (
          <div className="loading">Carregando tarefas...</div>
        ) : (
          <div className="tasks-container">
            {tasks.length === 0 ? (
              <div className="empty-state">
                <p>Nenhuma tarefa encontrada.</p>
                <p>Adicione uma nova tarefa acima!</p>
              </div>
            ) : (
              tasks.map(task => (
                <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="task-checkbox"
                    />
                    <span className="task-title">{task.title}</span>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="delete-button"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        <div className="stats">
          <p>Total: {tasks.length} tarefas</p>
          <p>Concluídas: {tasks.filter(t => t.completed).length}</p>
          <p>Pendentes: {tasks.filter(t => !t.completed).length}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
