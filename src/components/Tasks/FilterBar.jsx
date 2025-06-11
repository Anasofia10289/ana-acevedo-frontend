import '../../styles/components/FilterBar.css';

const FilterBar = ({ filters, onFiltersChange, tasks }) => {
  const subjects = [...new Set(tasks.map(task => task.subject))].sort();

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      subject: '',
      status: ''
    });
  };

  const hasActiveFilters = filters.search || filters.subject || filters.status;

  return (
    <div className="filter-bar">
      <div className="filter-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar tareas..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-controls">
          <select
            value={filters.subject}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
            className="filter-select"
          >
            <option value="">Todas las materias</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="filter-select"
          >
            <option value="">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="btn btn-secondary clear-filters-btn"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;