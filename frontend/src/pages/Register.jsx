import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Shield,
  CreditCard,
  TrendingUp,
  PieChart as PieChartIcon
} from 'lucide-react';

import { useNavigate } from "react-router-dom"

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const RegisterCard = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid #e5e7eb;
`;

const LeftPanel = styled.div`
  flex: 1;
  background: #1f2937;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RightPanel = styled.div`
  flex: 1;
  padding: 60px;
  display: flex;
  flex-direction: column;
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
  background: #8b5cf6;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: white;
  }
`;

const LogoText = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: white;
`;

const Header = styled.div`
  margin-bottom: 48px;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #9ca3af;
  line-height: 1.6;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FeatureItem = styled.div`
  display: flex;
  gap: 16px;
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: #8b5cf6;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 16px;
  color: white;
  margin-bottom: 4px;
`;

const FeatureDescription = styled.p`
  font-size: 14px;
  color: #9ca3af;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 48px;
  gap: 24px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: white;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #9ca3af;
`;

const FormHeader = styled.div`
  margin-bottom: 40px;
`;

const FormTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
`;

const FormSubtitle = styled.p`
  color: #6b7280;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
`;

const InputContainer = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;

  &:focus {
    border-color: #8b5cf6;
    outline: none;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
`;

const TermsCheckbox = styled.div`
  margin-bottom: 32px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #6b7280;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
`;

const Link = styled.a`
  color: #8b5cf6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #7c3aed;
  }
`;

const LoginLink = styled.div`
  margin-top: 32px;
  text-align: center;
  font-size: 14px;
`;


const Register = () => {

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.target;

    const userData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    }

    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.msg)
      return;
    }else{
      alert("User created successfully")
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/")
  }

  return (
    <Container>
      <RegisterCard>
        <LeftPanel>
          <Logo>
            <LogoIcon>
              <CreditCard />
            </LogoIcon>
            <LogoText>Finora</LogoText>
          </Logo>

          <Header>
            <Title>Join Finora</Title>
            <Subtitle>
              Track your expenses, analyze your spending, and stay in control.
            </Subtitle>
          </Header>

          <Features>
            <FeatureItem>
              <FeatureIcon><Shield /></FeatureIcon>
              <div>
                <FeatureTitle>Secure</FeatureTitle>
                <FeatureDescription>Your data is protected</FeatureDescription>
              </div>
            </FeatureItem>

            <FeatureItem>
              <FeatureIcon><TrendingUp /></FeatureIcon>
              <div>
                <FeatureTitle>Smart Insights</FeatureTitle>
                <FeatureDescription>Understand your money</FeatureDescription>
              </div>
            </FeatureItem>

            <FeatureItem>
              <FeatureIcon><PieChartIcon /></FeatureIcon>
              <div>
                <FeatureTitle>Visual Reports</FeatureTitle>
                <FeatureDescription>Beautiful charts</FeatureDescription>
              </div>
            </FeatureItem>
          </Features>

          <Stats>
            <StatItem>
              <StatValue>50K+</StatValue>
              <StatLabel>Users</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>$2B+</StatValue>
              <StatLabel>Tracked</StatLabel>
            </StatItem>
          </Stats>
        </LeftPanel>

        <RightPanel>
          <FormHeader>
            <FormTitle>Create Account</FormTitle>
            <FormSubtitle>Start tracking your finances today</FormSubtitle>
          </FormHeader>

          <form onSubmit={handleSubmit}>
            <InputGroup>
              <InputLabel>Name</InputLabel>
              <InputContainer>
                <InputIcon><User /></InputIcon>
                <Input name="name"  required />
              </InputContainer>
            </InputGroup>

            <InputGroup>
              <InputLabel>Email</InputLabel>
              <InputContainer>
                <InputIcon><Mail /></InputIcon>
                <Input type="email" name="email"  required />
              </InputContainer>
            </InputGroup>

            <InputGroup>
              <InputLabel>Password</InputLabel>
              <InputContainer>
                <InputIcon><Lock /></InputIcon>
                <Input
                  type="password"
                  name="password"
                  required
                />
              </InputContainer>
            </InputGroup>

            <RegisterButton type="submit">
              Create Account <ArrowRight size={18} />
            </RegisterButton>

            <LoginLink>
              Already have an account? <Link href="/login">Login</Link>
            </LoginLink>
          </form>
        </RightPanel>
      </RegisterCard>
    </Container>
  );
};

export default Register;
