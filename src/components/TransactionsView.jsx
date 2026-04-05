import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiDownload, FiX, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import TransactionModal from './TransactionModal';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);

const ITEMS_PER_PAGE = 10;

export default function TransactionsView() {
  const { state, dispatch, getFilteredTransactions } = useApp();
  const { filters, role } = state;
  const isAdmin = role === 'admin';

  const [currentPage, setCurrentPage] = useState(1);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const filtered = useMemo(() => getFilteredTransactions(), [getFilteredTransactions]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (field) => {
    if (filters.sortBy === field) {
      dispatch({
        type: 'SET_FILTER',
        payload: { key: 'sortOrder', value: filters.sortOrder === 'asc' ? 'desc' : 'asc' },
      });
    } else {
      dispatch({ type: 'SET_FILTER', payload: { key: 'sortBy', value: field } });
      dispatch({ type: 'SET_FILTER', payload: { key: 'sortOrder', value: 'desc' } });
    }
  };

  const getSortIcon = (field) => {
    if (filters.sortBy !== field) return null;
    return filters.sortOrder === 'asc' ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />;
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  };

  const exportData = (format) => {
    const data = getFilteredTransactions();
    if (format === 'csv') {
      const headers = 'Date,Description,Amount,Type,Category,Note\n';
      const rows = data.map(t => {
        const cat = CATEGORIES.find(c => c.id === t.category);
        return `${t.date},"${t.description}",${t.amount},${t.type},"${cat?.name || t.category}","${t.note || ''}"`;
      }).join('\n');
      downloadFile(headers + rows, 'transactions.csv', 'text/csv');
    } else {
      downloadFile(JSON.stringify(data, null, 2), 'transactions.json', 'application/json');
    }
    setShowExportMenu(false);
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Active filters display
  const activeFilterTags = [];
  if (filters.type !== 'all') activeFilterTags.push({ key: 'type', label: `Type: ${filters.type}` });
  if (filters.category !== 'all') {
    const cat = CATEGORIES.find(c => c.id === filters.category);
    activeFilterTags.push({ key: 'category', label: `Category: ${cat?.name || filters.category}` });
  }
  if (filters.dateRange.start) activeFilterTags.push({ key: 'dateRange', label: `From: ${filters.dateRange.start}` });
  if (filters.dateRange.end) activeFilterTags.push({ key: 'dateRange', label: `To: ${filters.dateRange.end}` });

  const clearFilterTag = (key) => {
    if (key === 'type') dispatch({ type: 'SET_FILTER', payload: { key: 'type', value: 'all' } });
    if (key === 'category') dispatch({ type: 'SET_FILTER', payload: { key: 'category', value: 'all' } });
    if (key === 'dateRange') dispatch({ type: 'SET_FILTER', payload: { key: 'dateRange', value: { start: '', end: '' } } });
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="transactions-toolbar">
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            id="search-transactions"
            type="text"
            className="search-input"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) =>
              dispatch({ type: 'SET_FILTER', payload: { key: 'search', value: e.target.value } })
            }
          />
        </div>

        <select
          id="filter-type"
          className="filter-select"
          value={filters.type}
          onChange={(e) =>
            dispatch({ type: 'SET_FILTER', payload: { key: 'type', value: e.target.value } })
          }
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          id="filter-category"
          className="filter-select"
          value={filters.category}
          onChange={(e) =>
            dispatch({ type: 'SET_FILTER', payload: { key: 'category', value: e.target.value } })
          }
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="date-input"
          value={filters.dateRange.start}
          onChange={(e) =>
            dispatch({
              type: 'SET_FILTER',
              payload: { key: 'dateRange', value: { ...filters.dateRange, start: e.target.value } },
            })
          }
          placeholder="Start Date"
        />

        <input
          type="date"
          className="date-input"
          value={filters.dateRange.end}
          onChange={(e) =>
            dispatch({
              type: 'SET_FILTER',
              payload: { key: 'dateRange', value: { ...filters.dateRange, end: e.target.value } },
            })
          }
          placeholder="End Date"
        />

        {activeFilterTags.length > 0 && (
          <button
            className="btn-secondary"
            style={{ fontSize: '0.75rem', padding: '8px 14px' }}
            onClick={() => dispatch({ type: 'RESET_FILTERS' })}
          >
            <FiX size={12} /> Clear All
          </button>
        )}

        <div className="export-menu" style={{ position: 'relative' }}>
          <button
            className="btn-secondary"
            onClick={() => setShowExportMenu(!showExportMenu)}
          >
            <FiDownload size={14} /> Export
          </button>
          {showExportMenu && (
            <div className="export-dropdown">
              <button onClick={() => exportData('csv')}>📄 Export CSV</button>
              <button onClick={() => exportData('json')}>📋 Export JSON</button>
            </div>
          )}
        </div>

        {isAdmin && (
          <button
            id="add-transaction-btn"
            className="btn-primary"
            onClick={() => dispatch({ type: 'OPEN_MODAL' })}
          >
            <FiPlus size={16} /> Add Transaction
          </button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilterTags.length > 0 && (
        <div className="active-filters">
          {activeFilterTags.map((tag, i) => (
            <span key={i} className="filter-tag">
              {tag.label}
              <button onClick={() => clearFilterTag(tag.key)}>×</button>
            </span>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div style={{
        fontSize: '0.8rem', color: 'var(--text-tertiary)',
        marginBottom: 'var(--space-md)', fontWeight: 500
      }}>
        Showing {paginatedTransactions.length} of {filtered.length} transactions
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No transactions found</h3>
            <p>Try adjusting your filters or search query to find what you&apos;re looking for.</p>
            <button
              className="btn-primary"
              style={{ marginTop: '16px' }}
              onClick={() => dispatch({ type: 'RESET_FILTERS' })}
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="transactions-table-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th
                    className={filters.sortBy === 'description' ? 'sorted' : ''}
                    onClick={() => handleSort('description')}
                  >
                    Description {getSortIcon('description')}
                  </th>
                  <th
                    className={filters.sortBy === 'date' ? 'sorted' : ''}
                    onClick={() => handleSort('date')}
                  >
                    Date <span className="sort-indicator">{getSortIcon('date')}</span>
                  </th>
                  <th
                    className={filters.sortBy === 'amount' ? 'sorted' : ''}
                    onClick={() => handleSort('amount')}
                  >
                    Amount <span className="sort-indicator">{getSortIcon('amount')}</span>
                  </th>
                  <th>Type</th>
                  <th>Category</th>
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map(t => {
                  const cat = CATEGORIES.find(c => c.id === t.category);
                  return (
                    <tr key={t.id}>
                      <td>
                        <div className="transaction-desc">
                          <div
                            className="transaction-category-icon"
                            style={{ background: `${cat?.color}20` }}
                          >
                            {cat?.icon}
                          </div>
                          <div className="transaction-desc-text">
                            <h4>{t.description}</h4>
                            {t.note && <span>{t.note}</span>}
                          </div>
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                        {new Date(t.date).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric',
                        })}
                      </td>
                      <td>
                        <span className={t.type === 'income' ? 'amount-income' : 'amount-expense'}>
                          {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                        </span>
                      </td>
                      <td>
                        <span className={`type-badge ${t.type}`}>
                          {t.type === 'income' ? '↑' : '↓'} {t.type}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {cat?.icon} {cat?.name}
                      </td>
                      {isAdmin && (
                        <td>
                          <div className="action-btns">
                            <button
                              className="action-btn"
                              onClick={() => dispatch({ type: 'SET_EDITING_TRANSACTION', payload: t })}
                              title="Edit"
                            >
                              <FiEdit2 size={13} />
                            </button>
                            <button
                              className="action-btn delete"
                              onClick={() => handleDelete(t.id)}
                              title="Delete"
                            >
                              <FiTrash2 size={13} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next →
          </button>
        </div>
      )}

      {/* Transaction Modal */}
      {state.isModalOpen && <TransactionModal />}
    </div>
  );
}
