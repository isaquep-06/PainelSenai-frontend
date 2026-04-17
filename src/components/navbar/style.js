import styled from "styled-components";

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  padding: 5px 32px;
  margin-bottom: 5px;
  
  background: #ffffff; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  font-family: 'Inter', sans-serif;
`;

export const Logo = styled.img`
  width: 220px;
  height: 40px;
  object-fit: contain;

  @media (min-width: 1920px) {
    height: 60px;
  }
`;

export const UL = styled.ul`
  display: flex;
  align-items: center;
  gap: 24px;

  padding: 0;
  margin: 0;
`;

export const LiClick = styled.li`
  list-style: none;

  font-size: clamp(14px, 1.2vw, 22px);
  font-weight: 600;

  cursor: pointer;
  padding: 8px 16px;
  border-radius: 6px;

  transition: all 0.3s ease;
  position: relative;

  /* 👇 cores adaptadas pro fundo branco */
  color: ${({ active }) => (active ? "#2563eb" : "#1f2937")};
  background: ${({ active }) => (active ? "#e0ecff" : "transparent")};

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;
    width: ${({ active }) => (active ? "100%" : "0%")};
    height: 3px;
    background: #2563eb;
    transition: 0.3s;
  }

  &:hover {
    background: #f3f4f6;
  }

  &:hover::after {
    width: 100%;
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const LI = styled.li`
  list-style: none;

  font-size: clamp(14px, 1.2vw, 22px);
  color: #6b7280;
`;