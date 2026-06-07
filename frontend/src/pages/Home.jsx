import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import {
  CreditCard,
  TrendingDown,
  TrendingUp,
  Menu,
  Sun,
  Moon,
  Utensils,
  Briefcase,
  Tv,
  Coffee,
  DollarSign,
  ShoppingBag,
  Car,
  Home as HomeIcon,
  Heart,
  Book,
  Gift,
  Music,
  Plane,
  GamepadIcon,
  Wifi
} from 'lucide-react';
import Sidebar from './Sidebar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const lightTheme = {
  background: '#f9fafb',
  text: '#111827',
  sidebarBg: '#ffffff',
  sidebarBorder: '#e5e7eb',
  cardBg: '#ffffff',
  cardBorder: '#e5e7eb',
  navHover: '#f3e8ff',
  navActive: '#8b5cf6',
  navText: '#6b7280',
  navTextActive: '#ffffff',
  headerBg: '#ffffff',
  headerBorder: '#e5e7eb',
  statLabel: '#6b7280',
  positive: '#10b981',
  negative: '#ef4444',
  grid: '#e5e7eb',
  iconBtnHover: '#f3f4f6'
};

const darkTheme = {
  background: '#111827',
  text: '#ffffff',
  sidebarBg: '#1f2937',
  sidebarBorder: '#374151',
  cardBg: '#1f2937',
  cardBorder: '#374151',
  navHover: '#374151',
  navActive: '#8b5cf6',
  navText: '#9ca3af',
  navTextActive: '#ffffff',
  headerBg: '#1f2937',
  headerBorder: '#374151',
  statLabel: '#9ca3af',
  positive: '#10b981',
  negative: '#ef4444',
  grid: '#374151',
  iconBtnHover: '#374151'
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    transition: background-color 0.3s, color 0.3s;
  }
`;

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  transition: all 0.3s;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 256px;
  transition: margin-left 0.3s;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Header = styled.header`
  background-color: ${props => props.theme.headerBg};
  border-bottom: 1px solid ${props => props.theme.headerBorder};
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  color: ${props => props.theme.text};
  
  &:hover {
    background-color: ${props => props.theme.iconBtnHover};
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const Dashboard = styled.div`
  padding: 24px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background-color: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.cardBorder};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const StatLabel = styled.span`
  color: ${props => props.theme.statLabel};
  font-size: 14px;
`;

const StatIcon = styled.div`
  width: 24px;
  height: 24px;
  color: ${props => props.color};
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const StatChange = styled.div`
  font-size: 14px;
  color: ${props => props.$positive ? props.theme.positive : props.theme.negative};
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background-color: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.cardBorder};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const ChartContainer = styled.div`
  position: relative;
  height: 300px;
`;

const BottomSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${props => props.theme.cardBorder};
  
  &:last-child {
    border-bottom: none;
  }
`;

const TransactionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TransactionIcon = styled.div`
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => 
    props.$type === 'expense' 
      ? props.theme.mode === 'dark' 
        ? 'rgba(220, 38, 38, 0.2)' 
        : '#fee2e2'
      : props.theme.mode === 'dark'
        ? 'rgba(16, 185, 129, 0.2)'
        : '#d1fae5'
  };
  
  svg {
    width: 20px;
    height: 20px;
    color: ${props => props.$type === 'expense' ? '#dc2626' : '#10b981'};
  }
`;

const TransactionName = styled.div`
  font-weight: 500;
`;

const TransactionType = styled.div`
  font-size: 14px;
  color: ${props => props.theme.statLabel};
`;

const TransactionAmount = styled.div`
  font-weight: 600;
  color: ${props => props.$type === 'expense' ? '#dc2626' : '#10b981'};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 18px;
  color: ${props => props.theme.statLabel};
`;

const getChartOptions = (theme) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: theme.statLabel
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: theme.grid
      },
      ticks: {
        color: theme.statLabel
      }
    },
    y: {
      grid: {
        color: theme.grid
      },
      ticks: {
        color: theme.statLabel
      }
    }
  }
});

const categoryIcons = {
  food: <Utensils />,
  groceries: <ShoppingBag />,
  transport: <Car />,
  transportation: <Car />,
  entertainment: <Tv />,
  bills: <HomeIcon />,
  utilities: <Wifi />,
  shopping: <ShoppingBag />,
  healthcare: <Heart />,
  education: <Book />,
  housing: <HomeIcon />,
  travel: <Plane />,
  dining: <Utensils />,
  subscriptions: <Music />,
  other: <DollarSign />,
  
  salary: <Briefcase />,
  freelance: <Coffee />,
  investments: <TrendingUp />,
  consulting: <Book />,
  education: <Book />,
  bonus: <Gift />,
  content: <Tv />,
  affiliate: <Heart />,
  parttime: <Coffee />,
  royalties: <Book />,
  interest: <DollarSign />,
  rental: <HomeIcon />,
  test: <GamepadIcon />
};

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalBalance: 0,
    totalExpenses: 0,
    totalEarnings: 0
  });

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/transactions/fetch`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setTransactions(data);
      calculateStats(data);
      
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (transactions) => {
    const totalEarnings = transactions
      .filter(t => t.type === "earning")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = totalEarnings - totalExpenses;

    setStats({
      totalBalance,
      totalExpenses,
      totalEarnings
    });
  };

  const getEarningsByCategory = () => {
    const earnings = transactions.filter(t => t.type === "earning");
    const categoryMap = {};
    earnings.forEach(t => {
      const category = t.category || 'other';
      categoryMap[category] = (categoryMap[category] || 0) + t.amount;
    });

    const labels = Object.keys(categoryMap);
    const data = Object.values(categoryMap);
    
    const colors = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#6366f1', '#818cf8', '#60a5fa', '#34d399', '#fbbf24'];
    
    return {
      labels,
      datasets: [{
        data,
        backgroundColor: labels.map((_, i) => colors[i % colors.length])
      }]
    };
  };

  const getExpensesByCategory = () => {
    const expenses = transactions.filter(t => t.type === "expense");
    const categoryMap = {};
    expenses.forEach(t => {
      const category = t.category || 'other';
      categoryMap[category] = (categoryMap[category] || 0) + t.amount;
    });
    const labels = Object.keys(categoryMap);
    const data = Object.values(categoryMap);
    const colors = ['#ef4444', '#f87171', '#fca5a5', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'];
    
    return {
      labels,
      datasets: [{
        data,
        backgroundColor: labels.map((_, i) => colors[i % colors.length])
      }]
    };
  };

  const getEarningTrendsByCategory = () => {
    const earnings = transactions.filter(t => t.type === "earning");
    const categoryMap = {};
    earnings.forEach(t => {
      const category = t.category || 'other';
      categoryMap[category] = (categoryMap[category] || 0) + t.amount;
    });

    const sortedCategories = Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const labels = sortedCategories.map(([category]) => category);
    const data = sortedCategories.map(([, amount]) => amount);

    return {
      labels,
      datasets: [{
        label: 'Earnings by Category',
        data,
        backgroundColor: '#8b5cf6',
        borderRadius: 8
      }]
    };
  };

  const getRecentTransactions = () => {
    return transactions
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(t => ({
        id: t._id,
        name: t.title,
        type: t.type,
        amount: t.amount,
        category: t.category,
        icon: categoryIcons[t.category?.toLowerCase()] || <DollarSign />
      }));
  };

  const getCategoryIcon = (category) => {
    return categoryIcons[category?.toLowerCase()] || <DollarSign />;
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const extendedTheme = {
    ...theme,
    mode: isDarkMode ? 'dark' : 'light'
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <ThemeProvider theme={extendedTheme}>
        <GlobalStyle />
        <AppContainer>
          <Sidebar 
            theme={theme}
            isOpen={sidebarOpen}
            onLogout={handleLogout}
          />
          <MainContent>
            <Header>
              <IconButton onClick={toggleSidebar}>
                <Menu />
              </IconButton>
              <IconButton onClick={toggleTheme}>
                {isDarkMode ? <Sun /> : <Moon />}
              </IconButton>
            </Header>
            <Dashboard>
              <LoadingContainer theme={theme}>
                Loading your financial data...
              </LoadingContainer>
            </Dashboard>
          </MainContent>
        </AppContainer>
      </ThemeProvider>
    );
  }

  const earningsByCategoryData = getEarningsByCategory();
  const expenseByCategoryData = getExpensesByCategory();
  const earningTrendsByCategoryData = getEarningTrendsByCategory();
  const recentTransactions = getRecentTransactions();

  return (
    <ThemeProvider theme={extendedTheme}>
      <GlobalStyle />
      <AppContainer>
        <Sidebar 
          theme={theme}
          isOpen={sidebarOpen}
          onLogout={handleLogout}
        />
        
        <MainContent>
          <Header>
            <IconButton onClick={toggleSidebar}>
              <Menu />
            </IconButton>
            <IconButton onClick={toggleTheme}>
              {isDarkMode ? <Sun /> : <Moon />}
            </IconButton>
          </Header>

          <Dashboard>
            <StatsGrid>
              <StatCard>
                <StatHeader>
                  <StatLabel>Total Balance</StatLabel>
                  <StatIcon color="#8b5cf6">
                    <CreditCard />
                  </StatIcon>
                </StatHeader>
                <StatValue>${stats.totalBalance.toFixed(2)}</StatValue>
                <StatChange $positive={stats.totalBalance >= 0}>
                  {stats.totalBalance >= 0 ? 'Positive' : 'Negative'} Balance
                </StatChange>
              </StatCard>

              <StatCard>
                <StatHeader>
                  <StatLabel>Total Expenses</StatLabel>
                  <StatIcon color="#ef4444">
                    <TrendingDown />
                  </StatIcon>
                </StatHeader>
                <StatValue>${stats.totalExpenses.toFixed(2)}</StatValue>
                <StatChange $positive={false}>
                  {transactions.filter(t => t.type === "expense").length} transactions
                </StatChange>
              </StatCard>

              <StatCard>
                <StatHeader>
                  <StatLabel>Total Earnings</StatLabel>
                  <StatIcon color="#10b981">
                    <TrendingUp />
                  </StatIcon>
                </StatHeader>
                <StatValue>${stats.totalEarnings.toFixed(2)}</StatValue>
                <StatChange $positive={true}>
                  {transactions.filter(t => t.type === "earning").length} transactions
                </StatChange>
              </StatCard>
            </StatsGrid>

            {(transactions.length > 0) && (
              <>
                <ChartsGrid>
                  <ChartCard>
                    <ChartTitle>Earnings by Category</ChartTitle>
                    <ChartContainer>
                      {earningsByCategoryData.labels.length > 0 ? (
                        <Pie 
                          data={earningsByCategoryData} 
                          options={{
                            ...getChartOptions(theme),
                            plugins: {
                              legend: {
                                position: 'bottom',
                                labels: {
                                  color: theme.statLabel
                                }
                              }
                            }
                          }} 
                        />
                      ) : (
                        <LoadingContainer theme={theme}>
                          No earnings data available
                        </LoadingContainer>
                      )}
                    </ChartContainer>
                  </ChartCard>

                  <ChartCard>
                    <ChartTitle>Expenses by Category</ChartTitle>
                    <ChartContainer>
                      {expenseByCategoryData.labels.length > 0 ? (
                        <Pie 
                          data={expenseByCategoryData} 
                          options={{
                            ...getChartOptions(theme),
                            plugins: {
                              legend: {
                                position: 'bottom',
                                labels: {
                                  color: theme.statLabel
                                }
                              }
                            }
                          }} 
                        />
                      ) : (
                        <LoadingContainer theme={theme}>
                          No expenses data available
                        </LoadingContainer>
                      )}
                    </ChartContainer>
                  </ChartCard>
                </ChartsGrid>

                <BottomSection>
                  <ChartCard>
                    <ChartTitle>Top Earning Categories</ChartTitle>
                    <ChartContainer>
                      {earningTrendsByCategoryData.labels.length > 0 ? (
                        <Bar 
                          data={earningTrendsByCategoryData} 
                          options={getChartOptions(theme)} 
                        />
                      ) : (
                        <LoadingContainer theme={theme}>
                          No earnings data available for chart
                        </LoadingContainer>
                      )}
                    </ChartContainer>
                  </ChartCard>

                  <ChartCard>
                    <ChartTitle>Recent Transactions</ChartTitle>
                    <div>
                      {recentTransactions.length > 0 ? (
                        recentTransactions.map((transaction) => (
                          <TransactionItem key={transaction.id}>
                            <TransactionLeft>
                              <TransactionIcon $type={transaction.type}>
                                {transaction.icon}
                              </TransactionIcon>
                              <div>
                                <TransactionName>{transaction.name}</TransactionName>
                                <TransactionType>
                                  {transaction.category} • {transaction.type}
                                </TransactionType>
                              </div>
                            </TransactionLeft>
                            <TransactionAmount $type={transaction.type}>
                              {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toFixed(2)}
                            </TransactionAmount>
                          </TransactionItem>
                        ))
                      ) : (
                        <LoadingContainer theme={theme}>
                          No transactions yet
                        </LoadingContainer>
                      )}
                    </div>
                  </ChartCard>
                </BottomSection>
              </>
            )}

            {transactions.length === 0 && !loading && (
              <ChartCard>
                <ChartTitle>Welcome to ExpenseFlow!</ChartTitle>
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <p style={{ marginBottom: '20px', color: theme.statLabel }}>
                    You don't have any transactions yet. Add your first transaction to see your financial dashboard!
                  </p>
                  <a 
                    href="/add" 
                    style={{
                      display: 'inline-block',
                      backgroundColor: theme.navActive,
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600'
                    }}
                  >
                    Add First Transaction
                  </a>
                </div>
              </ChartCard>
            )}
          </Dashboard>
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
};

export default Home;