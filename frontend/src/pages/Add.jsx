import React, { useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import {
  Menu,
  Sun,
  Moon,
  X,
  Calendar,
  Tag,
  DollarSign,
  Type as TypeIcon,
  Save,
  CheckCircle
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
  inputBorder: '#e5e7eb'
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
  inputBg: '#1f2937',
  inputBorder: '#374151'
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;


const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${p => p.theme.background};
  color: ${p => p.theme.text};
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 256px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Header = styled.header`
  background-color: ${p => p.theme.headerBg};
  border-bottom: 1px solid ${p => p.theme.headerBorder};
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 12px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  color: ${p => p.theme.text};
  &:hover {
    background-color: ${p => p.theme.iconBtnHover};
  }
`;

const Content = styled.div`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
`;

const FormCard = styled.div`
  background-color: ${p => p.theme.cardBg};
  border: 1px solid ${p => p.theme.cardBorder};
  border-radius: 16px;
  padding: 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  padding: 14px;
  border-radius: 12px;
  border: 2px solid ${p => p.theme.inputBorder};
  background-color: ${p => p.theme.inputBg};
  color: ${p => p.theme.text};
`;

const TypeToggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const TypeButton = styled.button`
  padding: 16px;
  border-radius: 12px;
  border: 2px solid ${p => p.$active ? '#8b5cf6' : p.theme.inputBorder};
  background-color: ${p => p.$active ? 'rgba(139,92,246,0.1)' : p.theme.inputBg};
  cursor: pointer;
`;

const SubmitButton = styled.button`
  padding: 16px;
  background-color: #8b5cf6;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 16px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  background: transparent;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
`;

const SuccessMessage = styled.div`
  color: #10b981;
`;


const Add = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    amount: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleTypeSelect = (type) => {
    setFormData(prev => ({ ...prev, type }));
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      category: '',
      amount: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      console.log(JSON.stringify(formData))

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || 'Error')
        alert("server error")
      }else{
        alert("transaction added")
      }

      handleCancel();
    }catch(err){
      console.log(err)
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Sidebar isOpen={sidebarOpen} />
        <MainContent>
          <Header>
            <HeaderLeft>
              <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu />
              </IconButton>
              <HeaderTitle>Add Transaction</HeaderTitle>
            </HeaderLeft>
            <HeaderRight>
              <IconButton onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <Sun /> : <Moon />}
              </IconButton>
            </HeaderRight>
          </Header>

          <Content>
            <FormCard>
              <Form onSubmit={handleSubmit}>
                <InputGroup>
                  <Input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
                </InputGroup>

                <InputGroup>
                  <Input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
                </InputGroup>

                <InputGroup>
                  <Input name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="Amount" />
                </InputGroup>

                <TypeToggle>
                  <TypeButton $active={formData.type === 'expense'} onClick={() => handleTypeSelect('expense')}>
                    Expense
                  </TypeButton>
                  <TypeButton $active={formData.type === 'earning'} onClick={() => handleTypeSelect('earning')}>
                    Earning
                  </TypeButton>
                </TypeToggle>

                <InputGroup>
                  <Input type="date" name="date" value={formData.date} onChange={handleChange} />
                </InputGroup>

                <SubmitButton>
                  Add Transaction
                </SubmitButton>
                <CancelButton type="button" onClick={handleCancel}>
                  Cancel
                </CancelButton>
              </Form>
            </FormCard>
          </Content>
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
};

export default Add;