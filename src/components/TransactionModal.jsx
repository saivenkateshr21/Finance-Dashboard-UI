import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { FiX } from 'react-icons/fi';

export default function TransactionModal() {
  const { state, dispatch } = useApp();
  const { editingTransaction } = state;

  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'food',
    date: new Date().toISOString().split('T')[0],
    note: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        description: editingTransaction.description,
        amount: String(editingTransaction.amount),
        type: editingTransaction.type,
        category: editingTransaction.category,
        date: editingTransaction.date,
        note: editingTransaction.note || '',
      });
    }
  }, [editingTransaction]);

  const validate = () => {
    const newErrors = {};
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      newErrors.amount = 'Enter a valid positive amount';
    }
    if (!form.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const transaction = {
      ...form,
      amount: parseFloat(form.amount),
    };

    if (editingTransaction) {
      dispatch({
        type: 'UPDATE_TRANSACTION',
        payload: { ...transaction, id: editingTransaction.id },
      });
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    }
  };

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
  };

  return (
    <div className="modal-overlay" onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{editingTransaction ? '✏️ Edit Transaction' : '➕ New Transaction'}</h3>
          <button
            className="modal-close"
            onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="tx-description">Description *</label>
              <input
                id="tx-description"
                type="text"
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="e.g., Grocery shopping"
                autoFocus
              />
              {errors.description && (
                <span style={{ color: 'var(--accent-danger)', fontSize: '0.75rem' }}>
                  {errors.description}
                </span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tx-amount">Amount ($) *</label>
                <input
                  id="tx-amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
                  placeholder="0.00"
                />
                {errors.amount && (
                  <span style={{ color: 'var(--accent-danger)', fontSize: '0.75rem' }}>
                    {errors.amount}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="tx-type">Type *</label>
                <select
                  id="tx-type"
                  value={form.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tx-category">Category *</label>
                <select
                  id="tx-category"
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="tx-date">Date *</label>
                <input
                  id="tx-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                />
                {errors.date && (
                  <span style={{ color: 'var(--accent-danger)', fontSize: '0.75rem' }}>
                    {errors.date}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tx-note">Note (Optional)</label>
              <textarea
                id="tx-note"
                value={form.note}
                onChange={(e) => handleChange('note', e.target.value)}
                placeholder="Add a note..."
                rows={2}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
