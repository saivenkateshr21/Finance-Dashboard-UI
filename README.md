# 💎 FinanceFlow – Smart Finance Dashboard

A premium, interactive finance dashboard built with React and Vite. Track income, expenses, and spending patterns with beautiful visualizations and an intuitive UI.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 📊 Dashboard Overview
- **Summary Cards** – Total Balance, Income, Expenses, and Savings Rate with period-over-period changes
- **Balance Trend** – Interactive area chart showing balance over time
- **Spending Breakdown** – Donut chart with category distribution
- **Monthly Income vs Expenses** – Side-by-side bar comparison
- **Daily Spending** – Last 30 days spending pattern
- **Recent Transactions** – Quick-view of latest activity

### 💳 Transactions
- Full transaction list with description, date, amount, type, and category
- **Search** – Real-time text search across descriptions, categories, and notes
- **Filtering** – Filter by type (income/expense), category, and date range
- **Sorting** – Click column headers to sort by date, amount, or description
- **Pagination** – Navigate through large datasets with ease
- **CRUD Operations** – Add, edit, and delete transactions (Admin only)
- **Export** – Download transactions as CSV or JSON

### 🔍 Insights
- Highest spending category identification
- Month-over-month expense comparison
- Average expense calculation
- Savings rate analysis
- Largest single expense tracking
- Most frequent category detection
- **Spending Radar** – Radar chart for multi-category comparison
- **Category Ranking** – Horizontal bar chart ranking all categories
- **Monthly Net Savings** – Line chart comparing income, expenses, and net savings

### 🛡️ Role-Based UI (RBAC)
- **Admin Mode** – Full access: view, add, edit, and delete transactions
- **Viewer Mode** – Read-only access: view data without modification capabilities
- Toggle between roles using the sidebar switcher
- Visual badge indicator showing the current active role

### 🎨 Design & UX
- **Dark/Light Mode** – Toggle between themes with persistent preference
- **Premium Aesthetics** – Glassmorphism, gradient cards, subtle glow effects
- **Responsive Design** – Fully adaptive from mobile to desktop
- **Smooth Animations** – Staggered entry animations and micro-interactions
- **Empty States** – Graceful handling of no-data scenarios
- **Notification System** – Toast notifications for user actions

### 💾 Data Persistence
- Transactions, role selection, and theme preference saved to `localStorage`
- State is restored automatically on page reload

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework with hooks & Context API |
| **Vite 8** | Build tool & dev server |
| **Recharts** | Charts & data visualization |
| **React Icons** | Icon library (Feather icons) |
| **Vanilla CSS** | Custom design system with CSS custom properties |
| **Context API + useReducer** | Global state management |
| **localStorage** | Client-side data persistence |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd finance-dashboard-ui

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` directory.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx            # Navigation sidebar with role/theme controls
│   ├── DashboardView.jsx      # Main dashboard with cards & charts
│   ├── TransactionsView.jsx   # Transaction table with filters & pagination
│   ├── TransactionModal.jsx   # Add/Edit transaction modal form
│   └── InsightsView.jsx       # Analytics insights with advanced charts
├── context/
│   └── AppContext.jsx         # Global state management (Context + Reducer)
├── data/
│   └── mockData.js            # Mock transaction data & utility functions
├── App.jsx                    # Root app layout & routing
├── main.jsx                   # Entry point
└── index.css                  # Complete design system & styles
```

---

## 🎯 State Management Approach

The app uses React's **Context API** combined with **useReducer** for centralized state management:

- **Transactions** – Full CRUD with optimistic updates
- **Filters** – Search, type, category, date range, sort field & order
- **Role** – Admin/Viewer toggle affecting UI permissions
- **Theme** – Dark/Light mode with CSS custom properties
- **UI State** – Modal visibility, editing state, notifications
- **Persistence** – Selective state saved to localStorage (transactions, role, theme)

The reducer pattern provides predictable state transitions and makes the data flow easy to trace and debug.

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout Changes |
|-----------|---------------|
| `> 1200px` | Full 4-column summary grid, 2-column chart grid |
| `769–1200px` | 2-column summary grid, single-column charts |
| `481–768px` | Collapsible sidebar, stacked layouts |
| `< 480px` | Compact cards, minimal padding |

---

## 🔮 Optional Enhancements Implemented

- ✅ Dark mode (with light mode toggle)
- ✅ Data persistence (localStorage)
- ✅ Animations and transitions
- ✅ Export functionality (CSV & JSON)
- ✅ Advanced filtering (multi-criteria + date range)
- ✅ Pagination
- ✅ Empty state handling
- ✅ Notification system

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
