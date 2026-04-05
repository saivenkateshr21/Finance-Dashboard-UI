import { useApp } from '../context/AppContext';
import { getInsights, getMonthlyData, getCategoryBreakdown, CATEGORIES } from '../data/mockData';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, Legend,
} from 'recharts';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="custom-tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="custom-tooltip-value" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' && entry.value > 100
              ? formatCurrency(entry.value)
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function InsightsView() {
  const { state } = useApp();
  const { transactions } = state;

  const insights = getInsights(transactions);
  const monthlyData = getMonthlyData(transactions);
  const categoryBreakdown = getCategoryBreakdown(transactions);

  // Create radar chart data from category spending
  const radarData = categoryBreakdown.slice(0, 7).map(cat => ({
    category: cat.name.split(' ')[0],
    amount: cat.value,
    fullMark: Math.max(...categoryBreakdown.map(c => c.value)),
  }));

  // Net savings per month
  const savingsData = monthlyData.map(m => ({
    ...m,
    savings: m.income - m.expenses,
  }));

  const insightCards = [
    {
      icon: insights.highestCategory.icon,
      label: 'Highest Spending Category',
      value: insights.highestCategory.name,
      detail: `${formatCurrency(insights.highestCategory.amount)} total spent`,
      gradient: 'linear-gradient(135deg, rgba(255, 107, 107, 0.12), rgba(255, 107, 107, 0.03))',
    },
    {
      icon: insights.monthlyChange.direction === 'up' ? '📈' : '📉',
      label: 'Month-over-Month Change',
      value: `${insights.monthlyChange.direction === 'up' ? '+' : ''}${insights.monthlyChange.percentage}%`,
      detail: `Mar: ${formatCurrency(insights.monthlyChange.current)} vs Feb: ${formatCurrency(insights.monthlyChange.previous)}`,
      gradient: insights.monthlyChange.direction === 'up'
        ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(239, 68, 68, 0.03))'
        : 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0.03))',
    },
    {
      icon: '💳',
      label: 'Average Expense',
      value: formatCurrency(insights.avgExpense),
      detail: `Across ${transactions.filter(t => t.type === 'expense').length} expense transactions`,
      gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(99, 102, 241, 0.03))',
    },
    {
      icon: '🏦',
      label: 'Savings Rate',
      value: `${insights.savingsRate}%`,
      detail: `Income-to-expense ratio: ${insights.incomeVsExpense.ratio}x`,
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0.03))',
    },
    {
      icon: '🔥',
      label: 'Largest Single Expense',
      value: formatCurrency(insights.largestExpense.amount),
      detail: `${insights.largestExpense.description} on ${new Date(insights.largestExpense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(245, 158, 11, 0.03))',
    },
    {
      icon: insights.mostFrequentCategory.icon,
      label: 'Most Frequent Category',
      value: insights.mostFrequentCategory.name,
      detail: `${insights.mostFrequentCategory.count} transactions in this category`,
      gradient: 'linear-gradient(135deg, rgba(108, 92, 231, 0.12), rgba(108, 92, 231, 0.03))',
    },
  ];

  return (
    <div>
      {/* Insight Cards */}
      <div className="insights-grid">
        {insightCards.map((card, idx) => (
          <div
            key={card.label}
            className={`card insight-card animate-in animate-in-delay-${(idx % 4) + 1}`}
            style={{ background: card.gradient }}
          >
            <div className="insight-card-icon">{card.icon}</div>
            <div className="insight-card-label">{card.label}</div>
            <div className="insight-card-value">{card.value}</div>
            <div className="insight-card-detail">{card.detail}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Monthly Net Savings */}
        <div className="card animate-in animate-in-delay-2">
          <div className="card-header">
            <span className="card-title">Monthly Net Savings</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={savingsData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
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
                  tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
                <Line
                  type="monotone"
                  dataKey="income"
                  name="Income"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ fill: '#10b981', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  name="Expenses"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  dot={{ fill: '#ef4444', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  name="Net Savings"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  strokeDasharray="5 5"
                  dot={{ fill: '#6366f1', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spending Radar */}
        <div className="card animate-in animate-in-delay-3">
          <div className="card-header">
            <span className="card-title">Spending Radar</span>
          </div>
          <div className="chart-container" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="var(--chart-grid)" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fontSize: 10, fill: 'var(--text-secondary)' }}
                />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar
                  name="Spending"
                  dataKey="amount"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Ranking */}
      <div className="card animate-in animate-in-delay-3">
        <div className="card-header">
          <span className="card-title">Category Spending Ranking</span>
        </div>
        <div className="chart-container" style={{ height: Math.max(250, categoryBreakdown.length * 40) }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryBreakdown}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }}
                tickFormatter={(v) => `$${v}`}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={100}
                tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Total Spent" radius={[0, 6, 6, 0]} maxBarSize={24}>
                {categoryBreakdown.map((entry, index) => (
                  <rect key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats Bar */}
      <div className="summary-grid" style={{ marginTop: 'var(--space-lg)' }}>
        <div className="card animate-in" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0.03))' }}>
          <div className="card-header">
            <span className="card-title">Total Income</span>
            <span className="card-icon">💰</span>
          </div>
          <div className="summary-card-value" style={{ color: 'var(--accent-success)' }}>
            {formatCurrency(insights.incomeVsExpense.income)}
          </div>
        </div>
        <div className="card animate-in animate-in-delay-1" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(239, 68, 68, 0.03))' }}>
          <div className="card-header">
            <span className="card-title">Total Expenses</span>
            <span className="card-icon">💸</span>
          </div>
          <div className="summary-card-value" style={{ color: 'var(--accent-danger-light)' }}>
            {formatCurrency(insights.incomeVsExpense.expenses)}
          </div>
        </div>
        <div className="card animate-in animate-in-delay-2" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(99, 102, 241, 0.03))' }}>
          <div className="card-header">
            <span className="card-title">Net Savings</span>
            <span className="card-icon">🏆</span>
          </div>
          <div className="summary-card-value" style={{ color: 'var(--accent-primary-light)' }}>
            {formatCurrency(insights.incomeVsExpense.income - insights.incomeVsExpense.expenses)}
          </div>
        </div>
        <div className="card animate-in animate-in-delay-3" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(245, 158, 11, 0.03))' }}>
          <div className="card-header">
            <span className="card-title">Total Transactions</span>
            <span className="card-icon">📊</span>
          </div>
          <div className="summary-card-value" style={{ color: 'var(--accent-warning)' }}>
            {insights.totalTransactions}
          </div>
        </div>
      </div>
    </div>
  );
}
