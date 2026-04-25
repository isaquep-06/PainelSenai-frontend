import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #ffffff;
  padding: 12px 32px;
  border-radius: 60px;
  margin: 20px 24px;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', sans-serif;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    margin: 12px;
    border-radius: 32px;
  }
`;

/* 🔹 LADO ESQUERDO */
export const NavLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

/* 🔹 CENTRO (BOTÕES) */
export const NavCenter = styled.ul`
  display: flex;
  gap: 16px;
  list-style: none;

  margin: 0;
  padding: 0;

  justify-content: center;
  flex: 2;

  @media (max-width: 640px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

/* 🔹 LADO DIREITO */
export const NavRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  gap: 16px;
`;

/* 🔹 BOTÃO TV */
export const TVButton = styled.button`
  background: #f1f5f9;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transition: stroke 0.2s ease;
  }

  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
    
    svg {
      stroke: white;
    }
  }

  &:active {
    transform: translateY(1px);
  }
`;

/* 🔹 ITEM */
export const NavItem = styled.li`
  padding: 10px 24px;
  border-radius: 40px;

  font-weight: 600;
  font-size: 1rem;

  cursor: pointer;
  transition: all 0.2s ease;

  background: ${({ active }) => (active ? '#2563eb' : '#f1f5f9')};
  color: ${({ active }) => (active ? 'white' : '#1e293b')};

  box-shadow: ${({ active }) =>
    active ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none'};

  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 24px;
  }

  &:hover {
    transform: translateY(-2px);
    background: ${({ active }) => (active ? '#1e40af' : '#e2e8f0')};
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 640px) {
    flex: 1;
    justify-content: center;
    font-size: 0.85rem;
    padding: 8px 12px;
  }
`;