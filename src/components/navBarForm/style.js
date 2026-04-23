import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 12px 32px;
  border-radius: 60px;
  margin: 20px 24px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', sans-serif;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
    margin: 12px;
    border-radius: 32px;
  }
`;

export const NavList = styled.ul`
  display: flex;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    justify-content: center;
  }
`;

export const NavItem = styled.li`
  padding: 10px 24px;
  border-radius: 40px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ active }) => (active ? '#2563eb' : '#f1f5f9')};
  color: ${({ active }) => (active ? 'white' : '#1e293b')};
  box-shadow: ${({ active }) => (active ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none')};
  display: flex;
  align-items: flex-end;
  gap: 15px;
  
  img {
    width: 30px;
  }
  &:hover {
    transform: translateY(-2px);
    background: ${({ active }) => (active ? '#1e40af' : '#e2e8f0')};
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 640px) {
    text-align: center;
    flex: 1;
    padding: 8px 12px;
    font-size: 0.85rem;
  }
`;

export const ModeIndicator = styled.div`
  background: #f8fafc;
  padding: 6px 16px;
  border-radius: 40px;
  font-size: 0.85rem;
  color: #0f172a;
  strong {
    color: #2563eb;
    font-weight: 700;
    margin-left: 6px;
  }

  @media (max-width: 640px) {
    text-align: center;
  }
`;