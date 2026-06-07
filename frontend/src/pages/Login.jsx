import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Shield,
  TrendingUp,
  CreditCard,
  PieChart,
  X
} from 'lucide-react';

import { useNavigate } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid #e2e8f0;
`;

const LeftPanel = styled.div`
  flex: 1;
  padding: 60px;
  background: white;
  display: flex;
  flex-direction: column;
`;

const RightPanel = styled.div`
  flex: 1;
  background: #0f172a;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #0f172a;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 22px;
    height: 22px;
    color: white;
  }
`;

const LogoText = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.5px;
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #64748b;
  line-height: 1.6;
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
  position: relative;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  margin-bottom: 8px;
`;

const InputContainer = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  font-size: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  color: #0f172a;
  transition: all 0.2s ease;
  outline: none;
  font-weight: 500;
  
  &:focus {
    border-color: #0f172a;
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #64748b;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
  user-select: none;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e1;
  border-radius: 5px;
  appearance: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  
  &:checked {
    background: #0f172a;
    border-color: #0f172a;
    
    &::after {
      content: '✓';
      position: absolute;
      color: white;
      font-size: 12px;
      font-weight: bold;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const ForgotLink = styled.a`
  font-size: 14px;
  color: #0f172a;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #0f172a;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #1e293b;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 32px 0;
  color: #94a3b8;
  font-size: 14px;
  
  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e2e8f0;
  }
  
  span {
    padding: 0 16px;
  }
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #cbd5e1;
    background: #f8fafc;
  }
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 32px;
  font-size: 14px;
  color: #64748b;
  
  a {
    color: #0f172a;
    font-weight: 600;
    text-decoration: none;
    margin-left: 4px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const RightContent = styled.div``;

const RightTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  line-height: 1.2;
`;

const RightSubtitle = styled.p`
  font-size: 16px;
  color: #cbd5e1;
  margin-bottom: 48px;
  line-height: 1.6;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 48px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #94a3b8;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const FeatureIcon = styled.div`
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 14px;
    height: 14px;
    color: white;
  }
`;

const FeatureText = styled.div`
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.5;
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  
  svg {
    flex-shrink: 0;
  }
`;

const Login = () => {

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.target;

    const userData = {
      email: form.email.value,
      password: form.password.value,
    }

    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })

    const data = await res.json();
    console.log(data)

    if (!res.ok) {
      alert(data.msg || "Login Failed")
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/")
  };

  const features = [
    { icon: <Shield />, text: 'Bank-level security & encryption' },
    { icon: <TrendingUp />, text: 'Smart expense analytics & insights' },
    { icon: <CreditCard />, text: 'Track all expenses in one place' },
    { icon: <PieChart />, text: 'Visual spending breakdowns' }
  ];

  return (
    <Container>
      <LoginCard>
        <LeftPanel>
          <Logo>
            <LogoIcon>
              <CreditCard />
            </LogoIcon>
            <LogoText>Finora</LogoText>
          </Logo>
          
          <Header>
            <Title>Sign In</Title>
            <Subtitle>
              Welcome back to Finora. Sign in to continue managing your finances.
            </Subtitle>
          </Header>

          <Form onSubmit={handleSubmit}>

            <InputGroup>
              <InputLabel>Email Address</InputLabel>
              <InputContainer>
                <InputIcon>
                  <Mail />
                </InputIcon>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  required
                />
              </InputContainer>
            </InputGroup>

            <InputGroup>
              <InputLabel>Password</InputLabel>
              <InputContainer>
                <InputIcon>
                  <Lock />
                </InputIcon>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  required
                />
              </InputContainer>
            </InputGroup>


            <LoginButton type="submit" >
              Login <ArrowRight size={18} />
            </LoginButton>

            <RegisterLink>
              Don't have an account? <a href="/register">Sign up</a>
            </RegisterLink>
          </Form>
        </LeftPanel>

        <RightPanel>
          <RightContent>
            <RightTitle>
              Master Your
              <br />
              Finances
            </RightTitle>
            <RightSubtitle>
              Join thousands of users who have taken control of their financial future with ExpenseFlow.
            </RightSubtitle>

            <Stats>
              <StatItem>
                <StatValue>50K+</StatValue>
                <StatLabel>Active Users</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>$2.1B+</StatValue>
                <StatLabel>Tracked</StatLabel>
              </StatItem>
            </Stats>

            <FeatureList>
              {features.map((feature, index) => (
                <FeatureItem key={index}>
                  <FeatureIcon>
                    {feature.icon}
                  </FeatureIcon>
                  <FeatureText>{feature.text}</FeatureText>
                </FeatureItem>
              ))}
            </FeatureList>
          </RightContent>
        </RightPanel>
      </LoginCard>
    </Container>
  );
};

export default Login;