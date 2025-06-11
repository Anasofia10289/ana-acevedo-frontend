import Swal from 'sweetalert2';
import '../../styles/components/TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusClass = () => {
    if (task.status === 'completed') return 'completed';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    if (dueDate < today) return 'overdue';
    return 'pending';
  };

  const getStatusText = () => {
    const statusClass = getStatusClass();
    switch (statusClass) {
      case 'completed': return 'Completada';
      case 'overdue': return 'Vencida';
      case 'pending': return 'Pendiente';
      default: return 'Pendiente';
    }
  };

  const getSubjectIcon = (subject) => {
    const iconMap = {
      'Matemáticas': '🔢',
      'Historia': '📚',
      'Química': '⚗️',
      'Física': '⚛️',
      'Biología': '🧬',
      'Literatura': '📖',
      'Inglés': '🌍',
      'Arte': '🎨',
      'Música': '🎵',
      'Educación Física': '⚽',
      'Geografía': '🌍',
      'Filosofía': '🤔'
    };
    return iconMap[subject] || '📝';
  };

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar la tarea "${task.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
        Swal.fire(
          '¡Eliminada!',
          'La tarea ha sido eliminada correctamente.',
          'success'
        );
      }
    });
  };

  const handleToggleStatus = () => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    const message = newStatus === 'completed' 
      ? '¿Marcar esta tarea como completada?' 
      : '¿Marcar esta tarea como pendiente?';

    Swal.fire({
      title: '¿Cambiar estado?',
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        onToggleStatus();
      }
    });
  };

  return (
    <div className={`task-card ${getStatusClass()}`}>
      <div className="task-header">
        <div className="task-subject">
          <span className="subject-icon">{getSubjectIcon(task.subject)}</span>
          <span className="subject-name">{task.subject}</span>
        </div>
        <span className={`task-status ${getStatusClass()}`}>
          {getStatusText()}
        </span>
      </div>

      <div className="task-body">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-date">
          <span className="date-icon">📅</span>
          <span>Vence: {formatDate(task.dueDate)}</span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className={`btn ${task.status === 'completed' ? 'btn-warning' : 'btn-success'}`}
          onClick={handleToggleStatus}
          title={task.status === 'completed' ? 'Marcar como pendiente' : 'Marcar como completada'}
        >
          {task.status === 'completed' ? '↺' : '✓'}
        </button>
        
        <button
          className="btn btn-secondary"
          onClick={onEdit}
          title="Editar tarea"
        >
          ✏️
        </button>
        
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          title="Eliminar tarea"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskCard;