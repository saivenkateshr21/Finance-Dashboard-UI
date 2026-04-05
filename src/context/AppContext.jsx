import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { generateTransactions } from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEY = 'finance-dashboard-state';

const loadState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Failed to load state from localStorage:', e);
  }
  return null;
};

const saveState = (state) => {
  try {
    const toSave = {
      transactions: state.transactions,
      role: state.role,
      theme: state.theme,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.warn('Failed to save state to localStorage:', e);
  }
};

const initialState = {
  transactions: generateTransactions(),
  role: 'admin', // 'admin' or 'viewer'
  theme: 'dark',
  activeTab: 'dashboard',
  filters: {
    search: '',
    type: 'all',
    category: 'all',
    dateRange: { start: '', end: '' },
    sortBy: 'date',
    sortOrder: 'desc',
  },
  editingTransaction: null,
  isModalOpen: false,
  notification: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.payload.key]: action.payload.value },
      };

    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
      };

    case 'ADD_TRANSACTION': {
      const newTransaction = {
        ...action.payload,
        id: 't' + String(state.transactions.length + 1).padStart(3, '0'),
      };
      return {
        ...state,
        transactions: [newTransaction, ...state.transactions],
        isModalOpen: false,
        notification: { type: 'success', message: 'Transaction added successfully!' },
      };
    }

    case 'UPDATE_TRANSACTION': {
      const updated = state.transactions.map(t =>
        t.id === action.payload.id ? { ...t, ...action.payload } : t
      );
      return {
        ...state,
        transactions: updated,
        editingTransaction: null,
        isModalOpen: false,
        notification: { type: 'success', message: 'Transaction updated successfully!' },
      };
    }

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
        notification: { type: 'success', message: 'Transaction deleted successfully!' },
      };

    case 'SET_EDITING_TRANSACTION':
      return {
        ...state,
        editingTransaction: action.payload,
        isModalOpen: true,
      };

    case 'OPEN_MODAL':
      return { ...state, isModalOpen: true, editingTransaction: null };

    case 'CLOSE_MODAL':
      return { ...state, isModalOpen: false, editingTransaction: null };

    case 'CLEAR_NOTIFICATION':
      return { ...state, notification: null };

    case 'LOAD_STATE':
      return {
        ...state,
        transactions: action.payload.transactions || state.transactions,
        role: action.payload.role || state.role,
        theme: action.payload.theme || state.theme,
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      dispatch({ type: 'LOAD_STATE', payload: saved });
    }
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    saveState(state);
  }, [state.transactions, state.role, state.theme]);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  // Auto-clear notifications
  useEffect(() => {
    if (state.notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.notification]);

  const getFilteredTransactions = useCallback(() => {
    let filtered = [...state.transactions];
    const { search, type, category, dateRange, sortBy, sortOrder } = state.filters;

    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        t =>
          t.description.toLowerCase().includes(lower) ||
          t.category.toLowerCase().includes(lower) ||
          t.note?.toLowerCase().includes(lower)
      );
    }

    if (type !== 'all') {
      filtered = filtered.filter(t => t.type === type);
    }

    if (category !== 'all') {
      filtered = filtered.filter(t => t.category === category);
    }

    if (dateRange.start) {
      filtered = filtered.filter(t => t.date >= dateRange.start);
    }
    if (dateRange.end) {
      filtered = filtered.filter(t => t.date <= dateRange.end);
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'description':
          comparison = a.description.localeCompare(b.description);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [state.transactions, state.filters]);

  return (
    <AppContext.Provider value={{ state, dispatch, getFilteredTransactions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
