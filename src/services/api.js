const API_BASE_URL = 'http://localhost:3030';

export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      const users = await response.json();
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return { success: true, user: userWithoutPassword };
      } else {
        return { success: false, message: 'Credenciales incorrectas' };
      }
    } catch (error) {
      return { success: false, message: 'Error de conexión' };
    }
  }
};

export const tasksAPI = {
  getAll: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks?userId=${userId}`);
      const tasks = await response.json();
      return { success: true, tasks };
    } catch (error) {
      return { success: false, message: 'Error al cargar tareas' };
    }
  },

  create: async (task) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...task,
          createdAt: new Date().toISOString(),
        }),
      });
      const newTask = await response.json();
      return { success: true, task: newTask };
    } catch (error) {
      return { success: false, message: 'Error al crear tarea' };
    }
  },

  update: async (id, updates) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const updatedTask = await response.json();
      return { success: true, task: updatedTask };
    } catch (error) {
      return { success: false, message: 'Error al actualizar tarea' };
    }
  },

  delete: async (id) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Error al eliminar tarea' };
    }
  }
};