import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Home as HomeIcon,
  TrendingDown,
  TrendingUp,
  PieChart as PieChartIcon,
  Wallet,
  CreditCard,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SidebarContainer = styled.aside`
  width: 256px;
  background-color: ${props => props.theme.sidebarBg};
  border-right: 1px solid ${props => props.theme.sidebarBorder};
  padding: 24px;
  transition: transform 0.3s;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 20;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${props => props.theme.sidebarBorder};
`;

const LogoIcon = styled(Wallet)`
  width: 32px;
  height: 32px;
  color: #8b5cf6;
`;

const LogoText = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.text};
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const NavSection = styled.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${props => props.theme.statLabel};
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  padding-left: 8px;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: ${props => props.$active ? props.theme.navTextActive : props.theme.navText};
  background-color: ${props => props.$active ? props.theme.navActive : 'transparent'};
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.$active ? props.theme.navActive : props.theme.navHover};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const NavItemText = styled.span`
  font-size: 14px;
  font-weight: ${props => props.$active ? '600' : '500'};
`;

const UserSection = styled.div`
  margin-top: auto;
  padding-top: 24px;
  border-top: 1px solid ${props => props.theme.sidebarBorder};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${props => props.theme.navHover};
  margin-bottom: 16px;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const UserDetails = styled.div`
  flex: 1;
  min-width: 0; /* Prevents text overflow */
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserEmail = styled.div`
  font-size: 12px;
  color: ${props => props.theme.statLabel};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Sidebar = ({ 
  theme, 
  isOpen = true,
  onLogout
}) => {
  const location = useLocation();
  const [user, setUser] = useState({
    name: "Loading...",
    email: "loading...",
    initials: "U"
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser({
          name: parsedUser.name || "User",
          email: parsedUser.email || "user@example.com",
          initials: getInitials(parsedUser.name || "User")
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
        setDefaultUser();
      }
    } else {
      setDefaultUser();
    }
  }, []);

  const getInitials = (name) => {
    if (!name || name === "Loading...") return "U";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const setDefaultUser = () => {
    setUser({
      name: "User",
      email: "user@example.com",
      initials: "U"
    });
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Redirect to login
    window.location.href = "/login";
    
    if (onLogout) {
      onLogout();
    }
  };

  const mainNavItems = [
    { path: '/', label: 'Dashboard', icon: <HomeIcon /> },
    { path: '/expenses', label: 'Expenses', icon: <TrendingDown /> },
    { path: '/earnings', label: 'Earnings', icon: <TrendingUp /> },
    { path: '/add', label: 'Add Transaction', icon: <CreditCard /> },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarContainer theme={theme} $isOpen={isOpen}>
      <Logo>
        <LogoIcon />
        <LogoText theme={theme}>Finora</LogoText>
      </Logo>

      <NavMenu>
        <NavSection>
          <SectionTitle theme={theme}>Main</SectionTitle>
          {mainNavItems.map((item) => (
            <NavItem
              key={item.path}
              to={item.path}
              $active={isActive(item.path)}
              theme={theme}
            >
              {item.icon}
              <NavItemText $active={isActive(item.path)}>
                {item.label}
              </NavItemText>
            </NavItem>
          ))}
        </NavSection>
      </NavMenu>

      <UserSection>
        <UserInfo theme={theme}>
          <UserAvatar>{user.initials}</UserAvatar>
          <UserDetails>
            <UserName theme={theme} title={user.name}>
              {user.name}
            </UserName>
            <UserEmail theme={theme} title={user.email}>
              {user.email}
            </UserEmail>
          </UserDetails>
        </UserInfo>
        
        <NavItem
          as="button"
          onClick={handleLogoutClick}
          theme={theme}
          style={{ 
            background: 'none', 
            border: 'none', 
            width: '100%',
            cursor: 'pointer',
            fontFamily: 'inherit'
          }}
        >
          <LogOut />
          <NavItemText>Logout</NavItemText>
        </NavItem>
      </UserSection>
    </SidebarContainer>
  );
};

export default Sidebar;