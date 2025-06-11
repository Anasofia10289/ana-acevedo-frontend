import TaskCard from './TaskCard';
import '../../styles/components/TaskList.css';

const TaskList = ({ tasks, onEditTask, onDeleteTask, onToggleStatus }) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No hay tareas</h3>
          <p>Comienza creando tu primera tarea académica</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="task-grid">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task.id)}
            onToggleStatus={() => onToggleStatus(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;