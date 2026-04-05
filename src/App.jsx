import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import TransactionsView from './components/TransactionsView';
import InsightsView from './components/InsightsView';
import { FiMenu } from 'react-icons/fi';
import './index.css';

function AppContent() {
  const { state, dispatch } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Listen for navigation events from child components
  useEffect(() => {
    const handleNavigate = (e) => {
      dispatch({ type: 'SET_ACTIVE_TAB', payload: e.detail });
    };
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, [dispatch]);

  const getPageTitle = () => {
    switch (state.activeTab) {
      case 'dashboard': return { title: 'Dashboard', subtitle: 'Overview of your financial activity' };
      case 'transactions': return { title: 'Transactions', subtitle: 'Manage and review all transactions' };
      case 'insights': return { title: 'Insights', subtitle: 'Understand your spending patterns' };
      default: return { title: 'Dashboard', subtitle: '' };
    }
  };

  const { title, subtitle } = getPageTitle();

  const renderView = () => {
    switch (state.activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'transactions': return <TransactionsView />;
      case 'insights': return <InsightsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="main-content">
        <header className="page-header">
          <div className="page-header-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                className="mobile-menu-btn"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <FiMenu />
              </button>
              <div>
                <h2>{title}</h2>
                <p>{subtitle}</p>
              </div>
            </div>
          </div>
          <div className="page-header-right">
            <span className={`header-badge ${state.role}`}>
              {state.role === 'admin' ? '🛡️' : '👁️'}
              {state.role === 'admin' ? 'Admin Mode' : 'Viewer Mode'}
            </span>
          </div>
        </header>

        {renderView()}
      </main>

      {/* Notification */}
      {state.notification && (
        <div className={`notification ${state.notification.type}`}>
          {state.notification.type === 'success' ? '✅' : '❌'}
          {state.notification.message}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
