import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h2 className="header-logo">EstudiaFácil</h2>
          <span className="header-subtitle">Gestor de Tareas Académicas</span>
        </div>
        
        <div className="header-right">
          <span className="header-user">Hola, {user.name}</span>
          <button 
            className="btn btn-secondary header-logout-btn"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;