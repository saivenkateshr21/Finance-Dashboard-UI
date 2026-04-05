import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from 'recharts';
import { getMonthlyData, getCategoryBreakdown, getBalanceTrend, getDailySpending } from '../data/mockData';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="custom-tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="custom-tooltip-value" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      style={{ fontSize: '0.7rem', fontWeight: 700 }}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DashboardView() {
  const { state } = useApp();
  const { transactions } = state;

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0);
  const totalBalance = 15000 + totalIncome - totalExpenses;
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1);

  const monthlyData = getMonthlyData(transactions);
  const categoryBreakdown = getCategoryBreakdown(transactions);
  const balanceTrend = getBalanceTrend(transactions);
  const dailySpending = getDailySpending(transactions);

  // Summary card changes (mock comparison with previous period)
  const prevBalance = totalBalance * 0.95;
  const balanceChange = ((totalBalance - prevBalance) / prevBalance * 100).toFixed(1);

  const summaryCards = [
    {
      title: 'Total Balance',
      value: formatCurrency(totalBalance),
      change: `+${balanceChange}%`,
      changeType: 'positive',
      icon: '💰',
      gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(129, 140, 248, 0.05))',
    },
    {
      title: 'Total Income',
      value: formatCurrency(totalIncome),
      change: '+12.5%',
      changeType: 'positive',
      icon: '📈',
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(52, 211, 153, 0.05))',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      change: '+8.3%',
      changeType: 'negative',
      icon: '📉',
      gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(248, 113, 113, 0.05))',
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      change: '+2.1%',
      changeType: 'positive',
      icon: '🏦',
      gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(251, 191, 36, 0.05))',
    },
  ];

  return (
    <div>
      {/* Summary Cards */}
      <div className="summary-grid">
        {summaryCards.map((card, idx) => (
          <div
            key={card.title}
            className={`card summary-card animate-in animate-in-delay-${idx + 1}`}
            style={{ background: card.gradient }}
          >
            <div className="card-header">
              <span className="card-title">{card.title}</span>
              <span className="card-icon">{card.icon}</span>
            </div>
            <div className="summary-card-value">{card.value}</div>
            <span className={`summary-card-change ${card.changeType}`}>
              {card.changeType === 'positive' ? '↑' : '↓'} {card.change} from last period
            </span>
          </div>
        ))}
      </div>

      {/* Charts Row 1: Balance Trend + Category Breakdown */}
      <div className="charts-grid">
        <div className="card animate-in animate-in-delay-2">
          <div className="card-header">
            <span className="card-title">Balance Trend</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }}
                  axisLine={{ stroke: 'var(--chart-grid)' }}
                  tickLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="balance"
                  name="Balance"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#balanceGradient)"
                  dot={false}
                  activeDot={{ r: 6, fill: '#6366f1', stroke: 'var(--bg-card)', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card animate-in animate-in-delay-3">
          <div className="card-header">
            <span className="card-title">Spending Breakdown</span>
          </div>
          <div className="chart-container" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  innerRadius={45}
                  dataKey="value"
                  strokeWidth={2}
                  stroke="var(--bg-card)"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
            {categoryBreakdown.slice(0, 6).map(cat => (
              <div key={cat.name} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: '0.7rem', color: 'var(--text-secondary)'
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: cat.color, display: 'inline-block'
                }} />
                {cat.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2: Monthly Income vs Expenses + Daily Spending */}
      <div className="charts-grid">
        <div className="card animate-in animate-in-delay-3">
          <div className="card-header">
            <span className="card-title">Monthly Income vs Expenses</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }}
                  axisLine={{ stroke: 'var(--chart-grid)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}
                />
                <Bar dataKey="income" name="Income" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card animate-in animate-in-delay-4">
          <div className="card-header">
            <span className="card-title">Daily Spending (Last 30 Days)</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySpending} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 9, fill: 'var(--text-tertiary)' }}
                  axisLine={{ stroke: 'var(--chart-grid)' }}
                  tickLine={false}
                  interval={4}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="amount"
                  name="Spending"
                  fill="#818cf8"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Transactions Preview */}
      <div className="card animate-in animate-in-delay-4">
        <div className="card-header">
          <span className="card-title">Recent Transactions</span>
          <button
            className="btn-secondary"
            style={{ fontSize: '0.75rem', padding: '6px 14px' }}
            onClick={() => {
              // Navigate to transactions tab via dispatching
              const event = new CustomEvent('navigate', { detail: 'transactions' });
              window.dispatchEvent(event);
            }}
          >
            View All →
          </button>
        </div>
        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .map(t => {
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
                            <span>{cat?.name}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                        {new Date(t.date).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        })}
                      </td>
                      <td>
                        <span className={t.type === 'income' ? 'amount-income' : 'amount-expense'}>
                          {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                        </span>
                      </td>
                      <td>
                        <span className={`type-badge ${t.type}`}>{t.type}</span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
