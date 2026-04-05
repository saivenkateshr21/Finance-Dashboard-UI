import { useApp } from '../context/AppContext';
import { FiGrid, FiList, FiBarChart2, FiSun, FiMoon } from 'react-icons/fi';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <FiGrid /> },
  { id: 'transactions', label: 'Transactions', icon: <FiList /> },
  { id: 'insights', label: 'Insights', icon: <FiBarChart2 /> },
];

export default function Sidebar({ isOpen, onClose }) {
  const { state, dispatch } = useApp();

  const handleTabChange = (tab) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
    onClose?.();
  };

  const toggleTheme = () => {
    dispatch({ type: 'SET_THEME', payload: state.theme === 'dark' ? 'light' : 'dark' });
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">💎</div>
            <div className="sidebar-logo-text">
              <h1>FinanceFlow</h1>
              <span>Smart Dashboard</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">Main Menu</div>
          {navItems.map(item => (
            <div
              key={item.id}
              className={`nav-item ${state.activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleTabChange(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleTabChange(item.id)}
            >
              <span className="nav-item-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {/* Role Switcher */}
          <div className="role-switcher">
            <label>User Role</label>
            <div className="role-toggle">
              <button
                className={`role-btn ${state.role === 'admin' ? 'active' : ''}`}
                onClick={() => dispatch({ type: 'SET_ROLE', payload: 'admin' })}
              >
                🛡️ Admin
              </button>
              <button
                className={`role-btn ${state.role === 'viewer' ? 'active' : ''}`}
                onClick={() => dispatch({ type: 'SET_ROLE', payload: 'viewer' })}
              >
                👁️ Viewer
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="theme-toggle">
            <span>{state.theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
            <div
              className={`theme-switch ${state.theme === 'dark' ? 'active' : ''}`}
              onClick={toggleTheme}
              role="switch"
              aria-checked={state.theme === 'dark'}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleTheme()}
            >
              <div className="theme-switch-knob">
                {state.theme === 'dark' ? <FiMoon /> : <FiSun />}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
