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

const EarningsSection = styled.div`
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

const EarningsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EarningsItem = styled.div`
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

const EarningsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

const EarningsIcon = styled.div`
  padding: 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.mode === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#d1fae5'};
  
  span {
    font-size: 24px;
  }
`;

const EarningsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const EarningsName = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const EarningsMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${props => props.theme.statLabel};
`;

const EarningsCategory = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  svg {
    width: 14px;
    height: 14px;
  }
`;

const EarningsDate = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  svg {
    width: 14px;
    height: 14px;
  }
`;

const EarningsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const EarningsAmount = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.positive};
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

const earningsCategoryIcons = {
  salary: '💰',
  freelance: '👨‍💻',
  investments: '📈',
  consulting: '💡',
  education: '🎓',
  bonus: '🎁',
  content: '🎬',
  affiliate: '🤝',
  parttime: '⏰',
  royalties: '📚',
  interest: '🏦',
  rental: '🏠',
  test: '🧪'
};

const handleDeleteEarning = async (id) => {
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
      fetchEarnings();
    } else {
      console.error('Failed to delete earning');
    }
  } catch (err) {
    console.error('Error deleting earning:', err);
  }
};

const Earnings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEarnings = async () => {
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

      const allTransactions = await res.json();
      console.log("All transactions:", allTransactions);
      
      const earningsOnly = allTransactions.filter(transaction => {
        return transaction.type === "earning";
      });
      
      setEarnings(earningsOnly);
      
    } catch (err) {
      console.error("Error fetching earnings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEarning = async (id) => {
    try {
      const token = localStorage.getItem("token");
      
      const isConfirmed = window.confirm("Are you sure you want to delete this earning?");
      if (!isConfirmed) return;
      
      console.log("Deleting earning with ID:", id);
      
      const res = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("Delete response status:", res.status);
      
      if (res.ok) {
        const data = await res.json();
        console.log("Delete successful:", data);
        
        setEarnings(prev => prev.filter(earning => earning._id !== id));
        
        alert("Earning deleted successfully!");
      } else {
        console.log("DELETE method failed, trying POST method...");
        await deleteWithPostMethod(id);
      }
    } catch (err) {
      console.error('Error deleting earning:', err);
      
      try {
        await deleteWithPostMethod(id);
      } catch (postErr) {
        alert('Error deleting earning. Please try again.');
      }
    }
  };
  
  const deleteWithPostMethod = async (id) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Trying POST method for deletion with ID:", id);
      
      const res = await fetch(`$/api/transactions/delete/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("POST delete response status:", res.status);
      
      if (res.ok) {
        const data = await res.json();
        console.log("POST delete successful:", data);
        
        setEarnings(prev => prev.filter(earning => earning._id !== id));
        
        alert("Earning deleted successfully!");
      } else {
        const errorData = await res.json();
        console.error("POST delete failed:", errorData);
        alert(`Failed to delete: ${errorData.msg || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error in POST delete method:', err);
      throw err;
    }
  };
  
  useEffect(() => {
    fetchEarnings();
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const extendedTheme = {
    ...theme,
    mode: isDarkMode ? 'dark' : 'light'
  };

  const totalEarnings = earnings.reduce((sum, earning) => sum + earning.amount, 0);
  const totalBalance = 12450.00 + totalEarnings;

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

  if (loading) {
    return (
      <ThemeProvider theme={extendedTheme}>
        <GlobalStyle />
        <AppContainer>
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
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '18px', color: extendedTheme.statLabel }}>
                  Loading earnings...
                </div>
              </div>
            </Dashboard>
          </MainContent>
        </AppContainer>
      </ThemeProvider>
    );
  }

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
              <PageTitle>Earnings</PageTitle>
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
                  <StatLabel>Total Earnings</StatLabel>
                  <StatIcon color="#10b981">
                    <span style={{ fontSize: '24px' }}>📈</span>
                  </StatIcon>
                </StatHeader>
                <StatValue>${totalEarnings.toFixed(2)}</StatValue>
              </StatCard>
            </StatsGrid>

            <EarningsSection>
              <SectionHeader>
                <SectionTitle>All Earnings</SectionTitle>
              </SectionHeader>

              <EarningsList>
                {earnings.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '48px 24px',
                    color: extendedTheme.statLabel
                  }}>
                    <p style={{ fontSize: '18px', marginBottom: '8px' }}>No earnings yet</p>
                    <p>Add your first earning to get started!</p>
                  </div>
                ) : (
                  earnings.map((earning) => (
                    <EarningsItem key={earning._id || earning.id}>
                      <EarningsLeft>
                        <EarningsIcon>
                          <span>
                            {earningsCategoryIcons[earning.category?.toLowerCase()] || '💼'}
                          </span>
                        </EarningsIcon>
                        <EarningsInfo>
                          <EarningsName>{earning.title}</EarningsName>
                          <EarningsMeta>
                            <EarningsCategory>
                              <Tag />
                              {earning.category?.charAt(0).toUpperCase() + earning.category?.slice(1) || 'Other'}
                            </EarningsCategory>
                            <EarningsDate>
                              <Calendar />
                              {new Date(earning.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </EarningsDate>
                          </EarningsMeta>
                        </EarningsInfo>
                      </EarningsLeft>
                      <EarningsRight>
                        <EarningsAmount>+${earning.amount.toFixed(2)}</EarningsAmount>
                        <DeleteButton onClick={() => handleDeleteEarning(earning._id)}>
                          <Trash2 />
                          Delete
                        </DeleteButton>
                      </EarningsRight>
                    </EarningsItem>
                  ))
                )}
              </EarningsList>
            </EarningsSection>
          </Dashboard>
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default Earnings;