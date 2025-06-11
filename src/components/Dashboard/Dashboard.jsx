import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { tasksAPI } from '../../services/api';
import Header from '../Layout/Header';
import TaskSummary from '../Tasks/TaskSummary';
import TaskList from '../Tasks/TaskList';
import TaskForm from '../Tasks/TaskForm';
import FilterBar from '../Tasks/FilterBar';
import '../../styles/components/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    subject: '',
    status: ''
  });

  useEffect(() => {
    loadTasks();
  }, [user]);

  useEffect(() => {
    filterTasks();
  }, [tasks, filters]);

  const loadTasks = async () => {
    if (!user) return;
    
    setIsLoading(true);
    const result = await tasksAPI.getAll(user.id);
    
    if (result.success) {
      setTasks(result.tasks);
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  const filterTasks = () => {
    let filtered = [...tasks];

    if (filters.search) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.subject.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.subject) {
      filtered = filtered.filter(task => task.subject === filters.subject);
    }

    if (filters.status) {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    setFilteredTasks(filtered);
  };

  const handleTaskSubmit = async (taskData) => {
    let result;
    
    if (editingTask) {
      result = await tasksAPI.update(editingTask.id, taskData);
    } else {
      result = await tasksAPI.create({
        ...taskData,
        userId: user.id
      });
    }

    if (result.success) {
      await loadTasks();
      setShowTaskForm(false);
      setEditingTask(null);
    } else {
      setError(result.message);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = async (taskId) => {
    const result = await tasksAPI.delete(taskId);
    if (result.success) {
      await loadTasks();
    } else {
      setError(result.message);
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    const result = await tasksAPI.update(task.id, { status: newStatus });
    
    if (result.success) {
      await loadTasks();
    } else {
      setError(result.message);
    }
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header />
      
      <main className="dashboard-content">
        <div className="dashboard-header">
          <h1>Bienvenido, {user.name}</h1>
          <button className="btn btn-primary" onClick={handleNewTask}>
            + Nueva Tarea
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <TaskSummary tasks={tasks} />

        <div className="tasks-section">
          <FilterBar 
            filters={filters} 
            onFiltersChange={setFilters}
            tasks={tasks}
          />
          
          <TaskList
            tasks={filteredTasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onToggleStatus={handleToggleStatus}
          />
        </div>

        {showTaskForm && (
          <TaskForm
            task={editingTask}
            onSubmit={handleTaskSubmit}
            onClose={handleCloseForm}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;