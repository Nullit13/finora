import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import {
  Menu,
  Sun,
  Moon,
  Plus,
  Trash2,
  Calendar,
  Tag,
  Search,
  Filter
} from 'lucide-react';
import Sidebar from './Sidebar';

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
  iconBtnHover: '#f3f4f6',
  inputBg: '#ffffff',
  inputBorder: '#d1d5db',
  buttonPrimary: '#8b5cf6',
  buttonPrimaryHover: '#7c3aed',
  buttonDanger: '#ef4444',
  buttonDangerHover: '#dc2626'
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
  iconBtnHover: '#374151',
  inputBg: '#374151',
  inputBorder: '#4b5563',
  buttonPrimary: '#8b5cf6',
  buttonPrimaryHover: '#7c3aed',
  buttonDanger: '#ef4444',
  buttonDangerHover: '#dc2626'
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

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const PageTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
`;

const AddButton = styled.button`
  background-color: ${props => props.theme.buttonPrimary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${props => props.theme.buttonPrimaryHover};
  }
  svg {
    width: 20px;
    height: 20px;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const ExpenseSection = styled.div`
  background-color: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.cardBorder};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 12px;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const SearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  svg {
    position: absolute;
    left: 12px;
    width: 20px;
    height: 20px;
    color: ${props => props.theme.statLabel};
  }
  input {
    padding: 10px 12px 10px 40px;
    border: 1px solid ${props => props.theme.inputBorder};
    border-radius: 8px;
    background-color: ${props => props.theme.inputBg};
    color: ${props => props.theme.text};
    font-size: 14px;
    width: 250px;
    transition: border-color 0.3s;
    &:focus {
      outline: none;
      border-color: ${props => props.theme.buttonPrimary};
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const FilterButton = styled.button`
  background-color: ${props => props.theme.inputBg};
  border: 1px solid ${props => props.theme.inputBorder};
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.text};
  transition: all 0.3s;
  &:hover {
    border-color: ${props => props.theme.buttonPrimary};
  }
  svg {
    width: 18px;
    height: 18px;
  }
`;

const ExpenseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid ${props => props.theme.cardBorder};
  border-radius: 8px;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const ExpenseLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

const ExpenseIcon = styled.div`
  padding: 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => {
    const colors = {
      food: props.theme.mode === 'dark' ? 'rgba(139, 92, 246, 0.2)' : '#ede9fe',
      transport: props.theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#dbeafe',
      entertainment: props.theme.mode === 'dark' ? 'rgba(236, 72, 153, 0.2)' : '#fce7f3',
      bills: props.theme.mode === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#fef3c7',
      shopping: props.theme.mode === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#d1fae5',
    };
    return colors[props.$category] || colors.food;
  }};
  
  svg {
    width: 24px;
    height: 24px;
    color: ${props => {
      const colors = {
        food: '#8b5cf6',
        transport: '#3b82f6',
        entertainment: '#ec4899',
        bills: '#f59e0b',
        shopping: '#10b981',
      };
      return colors[props.$category] || colors.food;
    }};
  }
`;

const ExpenseInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ExpenseName = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const ExpenseMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${props => props.theme.statLabel};
`;

const ExpenseCategory = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  svg {
    width: 14px;
    height: 14px;
  }
`;

const ExpenseDate = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  svg {
    width: 14px;
    height: 14px;
  }
`;

const ExpenseRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ExpenseAmount = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.negative};
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: 1px solid ${props => props.theme.buttonDanger};
  color: ${props => props.theme.buttonDanger};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  transition: all 0.3s;
  &:hover {
    background-color: ${props => props.theme.buttonDanger};
    color: white;
  }
  svg {
    width: 16px;
    height: 16px;
  }
`;

const categoryIcons = {
  food: '🍕',
  transport: '🚗',
  entertainment: '🎬',
  bills: '💡',
  shopping: '🛍️'
};

const Expenses = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/transactions/fetch`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
      
      const expensesOnly = data.filter(transaction => {
        return transaction.type === "expense";
      });
      
      setExpenses(expensesOnly);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    fetchExpenses();
  }, []);  

  const handleDeleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setExpenses(prev => prev.filter(expense => expense._id !== id));
        console.log('Expense deleted successfully');
      } else {
        const errorData = await res.json();
        console.error('Failed to delete expense:', errorData);
        alert(`Failed to delete expense: ${errorData.msg || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error deleting expense:', err);
      alert('Error deleting expense. Please try again.');
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const extendedTheme = {
    ...theme,
    mode: isDarkMode ? 'dark' : 'light'
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBalance = 12450.00;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <ThemeProvider theme={extendedTheme}>
      <GlobalStyle />
      <AppContainer>
        {/* Sidebar Component */}
        <Sidebar 
          theme={theme}
          isOpen={sidebarOpen}
          user={{
            name: 'John Doe',
            email: 'john@example.com',
            initials: 'JD'
          }}
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
            <PageHeader>
              <PageTitle>Expenses</PageTitle>
            </PageHeader>

            <StatsGrid>
              {/* <StatCard>
                <StatHeader>
                  <StatLabel>Total Balance</StatLabel>
                  <StatIcon color="#8b5cf6">
                    <span style={{ fontSize: '24px' }}>💰</span>
                  </StatIcon>
                </StatHeader>
                <StatValue>${totalBalance.toFixed(2)}</StatValue>
              </StatCard> */}

              <StatCard>
                <StatHeader>
                  <StatLabel>Total Expenses</StatLabel>
                  <StatIcon color="#ef4444">
                    <span style={{ fontSize: '24px' }}>📉</span>
                  </StatIcon>
                </StatHeader>
                <StatValue>${totalExpenses.toFixed(2)}</StatValue>
              </StatCard>
            </StatsGrid>

            <ExpenseSection>
              <SectionHeader>
                <SectionTitle>All Expenses</SectionTitle>
              </SectionHeader>

              <ExpenseList>
                {expenses.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '48px 24px',
                    color: extendedTheme.statLabel
                  }}>
                    <p style={{ fontSize: '18px', marginBottom: '8px' }}>No expenses yet</p>
                    <p>Add your first expense to get started!</p>
                  </div>
                ) : (
                  expenses.map((expense) => (
                    <ExpenseItem key={expense._id || expense.id}>
                      <ExpenseLeft>
                        <ExpenseIcon $category={expense.category?.toLowerCase()}>
                          <span style={{ fontSize: '24px' }}>
                            {categoryIcons[expense.category?.toLowerCase()] || '📦'}
                          </span>
                        </ExpenseIcon>
                        <ExpenseInfo>
                          <ExpenseName>{expense.title}</ExpenseName>
                          <ExpenseMeta>
                            <ExpenseCategory>
                              <Tag />
                              {expense.category?.charAt(0).toUpperCase() + expense.category?.slice(1) || 'Other'}
                            </ExpenseCategory>
                            <ExpenseDate>
                              <Calendar />
                              {new Date(expense.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </ExpenseDate>
                          </ExpenseMeta>
                        </ExpenseInfo>
                      </ExpenseLeft>
                      <ExpenseRight>
                        <ExpenseAmount>-${expense.amount.toFixed(2)}</ExpenseAmount>
                        <DeleteButton onClick={() => handleDeleteExpense(expense._id)}>
                          <Trash2 />
                          Delete
                        </DeleteButton>
                      </ExpenseRight>
                    </ExpenseItem>
                  ))
                )}
              </ExpenseList>
            </ExpenseSection>
          </Dashboard>
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default Expenses;