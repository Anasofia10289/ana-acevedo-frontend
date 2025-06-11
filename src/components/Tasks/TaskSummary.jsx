import '../../styles/components/TaskSummary.css';

const TaskSummary = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getOverdueTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return task.status === 'pending' && dueDate < today;
    }).length;
  };

  const overdueTasks = getOverdueTasks();

  return (
    <div className="task-summary">
      <div className="summary-cards">
        <div className="summary-card total">
          <div className="card-icon">📋</div>
          <div className="card-content">
            <h3>{totalTasks}</h3>
            <p>Total de Tareas</p>
          </div>
        </div>

        <div className="summary-card completed">
          <div className="card-icon">✅</div>
          <div className="card-content">
            <h3>{completedTasks}</h3>
            <p>Completadas</p>
          </div>
        </div>

        <div className="summary-card pending">
          <div className="card-icon">⏳</div>
          <div className="card-content">
            <h3>{pendingTasks}</h3>
            <p>Pendientes</p>
          </div>
        </div>

        <div className="summary-card overdue">
          <div className="card-icon">⚠️</div>
          <div className="card-content">
            <h3>{overdueTasks}</h3>
            <p>Vencidas</p>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <h4>Progreso General</h4>
          <span className="progress-percentage">{completionPercentage}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="progress-text">
          {completedTasks} de {totalTasks} tareas completadas
        </p>
      </div>
    </div>
  );
};

export default TaskSummary;