import { useState, useEffect } from 'react';
import '../../styles/components/TaskForm.css';

const TaskForm = ({ task, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    dueDate: '',
    status: 'pending'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const subjects = [
    'Matemáticas',
    'Historia', 
    'Química',
    'Física',
    'Biología',
    'Literatura',
    'Inglés',
    'Arte',
    'Música',
    'Educación Física',
    'Geografía',
    'Filosofía'
  ];

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        subject: task.subject,
        dueDate: task.dueDate,
        status: task.status
      });
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }

    if (!formData.subject) {
      newErrors.subject = 'La materia es obligatoria';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'La fecha límite es obligatoria';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dueDate = new Date(formData.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      
      if (dueDate < today) {
        newErrors.dueDate = 'La fecha límite no puede ser anterior a hoy';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error al guardar tarea:', error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form-container">
        <div className="task-form-header">
          <h2>{task ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">Título de la Tarea *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej: Ensayo sobre la Revolución Industrial"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="subject">Materia *</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={errors.subject ? 'error' : ''}
            >
              <option value="">Selecciona una materia</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            {errors.subject && <span className="error-text">{errors.subject}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Fecha Límite *</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={errors.dueDate ? 'error' : ''}
            />
            {errors.dueDate && <span className="error-text">{errors.dueDate}</span>}
          </div>

          {task && (
            <div className="form-group">
              <label htmlFor="status">Estado</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">Pendiente</option>
                <option value="completed">Completada</option>
              </select>
            </div>
          )}

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Guardando...' : (task ? 'Actualizar' : 'Crear Tarea')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;