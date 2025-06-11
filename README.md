# 🎓 EstudiaFácil (Gestor de Tareas Académicas) - Prueba Técnica Front-End

Aplicación web desarrollada como parte de la prueba técnica para la vacante de **Desarrollador Front-End Junior** en **EduWise Inc.**. Permite a los estudiantes autenticados gestionar sus tareas académicas de forma sencilla y organizada.

## 🚀 Tecnologías usadas

- ⚛️ React + Vite
- 💅 CSS Puro (sin frameworks)
- 🗂️ Arquitectura modular
- 📦 json-server (para simular API REST)

## 📦 Instalación y configuración

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clona el repositorio:**

```bash
git clone https://github.com/Anasofia10289/ana-acevedo-frontend.git
cd ana-acevedo-frontend
```

2. **Instala las dependencias:**

```bash
npm install
```

3. **Instala json-server globalmente (si no lo tienes):**

```bash
npm install -g json-server
```

4. **Levanta la API simulada:**

```bash
json-server --watch db.json --port 3001
```

> Asegúrate de tener el archivo `db.json` en la raíz del proyecto. Este actúa como backend simulado para manejar usuarios y tareas.

5. **Ejecuta la aplicación React:**

```bash
npm run dev
```

## 📋 Funcionalidades

### ✅ Autenticación

- **Login básico:** con correo y contraseña.
- **Validación contra la API (json-server).**
- **Redirección al dashboard en caso exitoso.**
- **Protección de rutas internas.**

### 📌 Gestión de tareas

- **Crear tarea:** con título, materia, fecha límite y estado (pendiente/completada).
- **Listar tareas:** en tarjetas o tabla.
- **Editar tareas:** modificar campos.
- **Eliminar tareas:** con confirmación usando SweetAlert2.
- **Marcar como completada.**

### 🔍 Filtrado y búsqueda

- **Buscar tareas por materia.**
- **Filtrar tareas por estado.**

### 📊 Resumen visual

- Cantidad total de tareas.
- Completadas y pendientes.

### 🔐 Cierre de sesión

- Botón de logout con redirección a login.

## 📁 Estructura del proyecto

```
src/
├── components/        
├── context/           
├── services/                      
├── styles/            
├── App.jsx
├── index.css
└── main.jsx

```

## ✨ Buenas prácticas aplicadas

- Componentes funcionales y organizados.
- Manejo de estado con hooks (`useState`, `useEffect`, `useContext`).
- Rutas protegidas con `react-router-dom`.
- Separación clara entre lógica, vista y estilos.
- Diseño responsivo básico usando solo CSS.

---

💼 **Simulación de entorno laboral real**: Esta prueba busca evaluar tu capacidad técnica, organización y lógica en un proyecto front-end moderno.

---

## 👨‍💻 Autor

**Ana Sofia Acevedo Quiroz**  
Estudiante de desarrollo web en Cesde | Apasionado por la programación front-end  