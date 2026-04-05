// Mock data for the Finance Dashboard

export const CATEGORIES = [
  { id: 'food', name: 'Food & Dining', icon: '🍔', color: '#FF6B6B' },
  { id: 'transport', name: 'Transportation', icon: '🚗', color: '#4ECDC4' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#45B7D1' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#96CEB4' },
  { id: 'bills', name: 'Bills & Utilities', icon: '💡', color: '#FFEAA7' },
  { id: 'health', name: 'Healthcare', icon: '🏥', color: '#DDA0DD' },
  { id: 'education', name: 'Education', icon: '📚', color: '#74B9FF' },
  { id: 'salary', name: 'Salary', icon: '💰', color: '#00B894' },
  { id: 'freelance', name: 'Freelance', icon: '💻', color: '#6C5CE7' },
  { id: 'investment', name: 'Investments', icon: '📈', color: '#FDCB6E' },
  { id: 'gift', name: 'Gifts', icon: '🎁', color: '#E17055' },
  { id: 'other', name: 'Other', icon: '📦', color: '#636E72' },
];

export const generateTransactions = () => {
  const transactions = [
    // January 2026
    { id: 't001', date: '2026-01-03', description: 'Monthly Salary', amount: 7500, type: 'income', category: 'salary', note: 'January salary' },
    { id: 't002', date: '2026-01-05', description: 'Grocery Shopping', amount: 142.50, type: 'expense', category: 'food', note: 'Weekly groceries' },
    { id: 't003', date: '2026-01-07', description: 'Electric Bill', amount: 89.00, type: 'expense', category: 'bills', note: 'January electricity' },
    { id: 't004', date: '2026-01-08', description: 'Uber Rides', amount: 32.40, type: 'expense', category: 'transport', note: '' },
    { id: 't005', date: '2026-01-10', description: 'Netflix Subscription', amount: 15.99, type: 'expense', category: 'entertainment', note: 'Monthly subscription' },
    { id: 't006', date: '2026-01-12', description: 'Freelance Web Project', amount: 1200, type: 'income', category: 'freelance', note: 'Website redesign for client' },
    { id: 't007', date: '2026-01-14', description: 'Doctor Visit', amount: 75.00, type: 'expense', category: 'health', note: 'Annual checkup' },
    { id: 't008', date: '2026-01-15', description: 'Online Course', amount: 49.99, type: 'expense', category: 'education', note: 'React masterclass' },
    { id: 't009', date: '2026-01-18', description: 'Restaurant Dinner', amount: 68.50, type: 'expense', category: 'food', note: 'Dinner with friends' },
    { id: 't010', date: '2026-01-20', description: 'Gas Station', amount: 55.00, type: 'expense', category: 'transport', note: '' },
    { id: 't011', date: '2026-01-22', description: 'Birthday Gift', amount: 45.00, type: 'expense', category: 'gift', note: "Mom's birthday" },
    { id: 't012', date: '2026-01-25', description: 'Amazon Purchase', amount: 129.99, type: 'expense', category: 'shopping', note: 'New headphones' },
    { id: 't013', date: '2026-01-28', description: 'Dividend Payment', amount: 340.00, type: 'income', category: 'investment', note: 'Q4 dividends' },
    { id: 't014', date: '2026-01-30', description: 'Internet Bill', amount: 59.99, type: 'expense', category: 'bills', note: '' },

    // February 2026
    { id: 't015', date: '2026-02-02', description: 'Monthly Salary', amount: 7500, type: 'income', category: 'salary', note: 'February salary' },
    { id: 't016', date: '2026-02-04', description: 'Grocery Shopping', amount: 156.80, type: 'expense', category: 'food', note: 'Weekly groceries' },
    { id: 't017', date: '2026-02-06', description: 'Gym Membership', amount: 45.00, type: 'expense', category: 'health', note: 'Monthly gym fee' },
    { id: 't018', date: '2026-02-08', description: 'Movie Tickets', amount: 28.00, type: 'expense', category: 'entertainment', note: '' },
    { id: 't019', date: '2026-02-10', description: 'Electric Bill', amount: 95.00, type: 'expense', category: 'bills', note: 'February electricity' },
    { id: 't020', date: '2026-02-12', description: 'Clothing Store', amount: 189.00, type: 'expense', category: 'shopping', note: 'Winter jacket' },
    { id: 't021', date: '2026-02-14', description: "Valentine's Dinner", amount: 120.00, type: 'expense', category: 'food', note: 'Special dinner' },
    { id: 't022', date: '2026-02-16', description: 'Freelance Design Work', amount: 800, type: 'income', category: 'freelance', note: 'Logo design project' },
    { id: 't023', date: '2026-02-18', description: 'Uber Rides', amount: 41.20, type: 'expense', category: 'transport', note: '' },
    { id: 't024', date: '2026-02-20', description: 'Book Purchase', amount: 24.99, type: 'expense', category: 'education', note: 'JavaScript patterns book' },
    { id: 't025', date: '2026-02-22', description: 'Gas Station', amount: 48.00, type: 'expense', category: 'transport', note: '' },
    { id: 't026', date: '2026-02-25', description: 'Phone Bill', amount: 69.99, type: 'expense', category: 'bills', note: '' },
    { id: 't027', date: '2026-02-27', description: 'Stock Gain', amount: 520.00, type: 'income', category: 'investment', note: 'Sold AAPL shares' },

    // March 2026
    { id: 't028', date: '2026-03-01', description: 'Monthly Salary', amount: 7500, type: 'income', category: 'salary', note: 'March salary' },
    { id: 't029', date: '2026-03-03', description: 'Grocery Shopping', amount: 134.20, type: 'expense', category: 'food', note: 'Weekly groceries' },
    { id: 't030', date: '2026-03-05', description: 'Spotify Premium', amount: 11.99, type: 'expense', category: 'entertainment', note: '' },
    { id: 't031', date: '2026-03-07', description: 'Car Insurance', amount: 215.00, type: 'expense', category: 'transport', note: 'Monthly premium' },
    { id: 't032', date: '2026-03-09', description: 'Electric Bill', amount: 82.00, type: 'expense', category: 'bills', note: '' },
    { id: 't033', date: '2026-03-11', description: 'Tech Gadget', amount: 299.99, type: 'expense', category: 'shopping', note: 'Wireless charger & accessories' },
    { id: 't034', date: '2026-03-13', description: 'Freelance Consulting', amount: 1500, type: 'income', category: 'freelance', note: 'DevOps consulting' },
    { id: 't035', date: '2026-03-15', description: 'Dentist Visit', amount: 150.00, type: 'expense', category: 'health', note: 'Dental cleaning' },
    { id: 't036', date: '2026-03-17', description: "St. Patrick's Dinner", amount: 85.00, type: 'expense', category: 'food', note: '' },
    { id: 't037', date: '2026-03-19', description: 'Uber Rides', amount: 27.60, type: 'expense', category: 'transport', note: '' },
    { id: 't038', date: '2026-03-21', description: 'Online Seminar', amount: 99.00, type: 'expense', category: 'education', note: 'Cloud computing seminar' },
    { id: 't039', date: '2026-03-23', description: 'Gift for Friend', amount: 60.00, type: 'expense', category: 'gift', note: '' },
    { id: 't040', date: '2026-03-25', description: 'Internet Bill', amount: 59.99, type: 'expense', category: 'bills', note: '' },
    { id: 't041', date: '2026-03-27', description: 'Investment Return', amount: 680.00, type: 'income', category: 'investment', note: 'Mutual fund returns' },
    { id: 't042', date: '2026-03-30', description: 'Concert Tickets', amount: 150.00, type: 'expense', category: 'entertainment', note: 'Live concert' },

    // April 2026
    { id: 't043', date: '2026-04-01', description: 'Monthly Salary', amount: 7500, type: 'income', category: 'salary', note: 'April salary' },
    { id: 't044', date: '2026-04-02', description: 'Grocery Shopping', amount: 167.30, type: 'expense', category: 'food', note: 'Weekly groceries' },
    { id: 't045', date: '2026-04-03', description: 'Water Bill', amount: 42.00, type: 'expense', category: 'bills', note: '' },
    { id: 't046', date: '2026-04-04', description: 'Freelance App Dev', amount: 2000, type: 'income', category: 'freelance', note: 'Mobile app prototype' },
    { id: 't047', date: '2026-04-05', description: 'Coffee & Snacks', amount: 18.50, type: 'expense', category: 'food', note: '' },
  ];

  return transactions;
};

export const getMonthlyData = (transactions) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr'];
  return months.map((month, idx) => {
    const monthNum = String(idx + 1).padStart(2, '0');
    const monthTransactions = transactions.filter(t => t.date.startsWith(`2026-${monthNum}`));
    const income = monthTransactions.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0);
    const expenses = monthTransactions.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0);
    return { month, income, expenses, net: income - expenses };
  });
};

export const getCategoryBreakdown = (transactions) => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const categoryMap = {};

  expenseTransactions.forEach(t => {
    if (!categoryMap[t.category]) {
      const cat = CATEGORIES.find(c => c.id === t.category);
      categoryMap[t.category] = {
        name: cat?.name || t.category,
        value: 0,
        color: cat?.color || '#636E72',
        icon: cat?.icon || '📦',
      };
    }
    categoryMap[t.category].value += t.amount;
  });

  return Object.values(categoryMap).sort((a, b) => b.value - a.value);
};

export const getBalanceTrend = (transactions) => {
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let balance = 15000; // Starting balance
  const trend = [];
  
  sorted.forEach(t => {
    balance += t.type === 'income' ? t.amount : -t.amount;
    trend.push({
      date: t.date,
      balance: parseFloat(balance.toFixed(2)),
      label: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    });
  });

  return trend;
};

export const getDailySpending = (transactions) => {
  const last30Days = [];
  const today = new Date('2026-04-05');
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayTransactions = transactions.filter(t => t.date === dateStr && t.type === 'expense');
    const total = dayTransactions.reduce((a, t) => a + t.amount, 0);
    
    last30Days.push({
      date: dateStr,
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      amount: total,
    });
  }
  
  return last30Days;
};

export const getInsights = (transactions) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const incomes = transactions.filter(t => t.type === 'income');
  
  // Highest spending category
  const categoryTotals = {};
  expenses.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });
  
  const highestCategory = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)[0];
  const highestCatInfo = CATEGORIES.find(c => c.id === highestCategory?.[0]);
  
  // Monthly comparison
  const marchExpenses = expenses.filter(t => t.date.startsWith('2026-03')).reduce((a, t) => a + t.amount, 0);
  const febExpenses = expenses.filter(t => t.date.startsWith('2026-02')).reduce((a, t) => a + t.amount, 0);
  const monthlyChange = ((marchExpenses - febExpenses) / febExpenses * 100).toFixed(1);
  
  // Average transaction
  const avgExpense = (expenses.reduce((a, t) => a + t.amount, 0) / expenses.length).toFixed(2);
  
  // Savings rate
  const totalIncome = incomes.reduce((a, t) => a + t.amount, 0);
  const totalExpenses = expenses.reduce((a, t) => a + t.amount, 0);
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1);
  
  // Largest single expense
  const largestExpense = expenses.sort((a, b) => b.amount - a.amount)[0];
  
  // Most frequent category
  const categoryFrequency = {};
  expenses.forEach(t => {
    categoryFrequency[t.category] = (categoryFrequency[t.category] || 0) + 1;
  });
  const mostFrequentCat = Object.entries(categoryFrequency).sort(([, a], [, b]) => b - a)[0];
  const mostFreqCatInfo = CATEGORIES.find(c => c.id === mostFrequentCat?.[0]);

  return {
    highestCategory: {
      name: highestCatInfo?.name || 'Unknown',
      icon: highestCatInfo?.icon || '📦',
      amount: highestCategory?.[1] || 0,
    },
    monthlyChange: {
      percentage: monthlyChange,
      direction: marchExpenses > febExpenses ? 'up' : 'down',
      current: marchExpenses,
      previous: febExpenses,
    },
    avgExpense: parseFloat(avgExpense),
    savingsRate: parseFloat(savingsRate),
    largestExpense: {
      description: largestExpense?.description || 'N/A',
      amount: largestExpense?.amount || 0,
      date: largestExpense?.date || '',
    },
    mostFrequentCategory: {
      name: mostFreqCatInfo?.name || 'Unknown',
      icon: mostFreqCatInfo?.icon || '📦',
      count: mostFrequentCat?.[1] || 0,
    },
    totalTransactions: transactions.length,
    incomeVsExpense: {
      income: totalIncome,
      expenses: totalExpenses,
      ratio: (totalIncome / totalExpenses).toFixed(2),
    },
  };
};
