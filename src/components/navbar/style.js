import styled from "styled-components";

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 32px;
  margin-bottom: 5px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
  position: relative;
  z-index: 10;
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
  list-style: none;
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
  color: ${({ active }) => (active ? "#fff" : "#1f2937")};
  background: ${({ active }) => (active ? "#0063ff" : "transparent")};

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
  font-weight: bold;
  color: #6b7280;
`;

export const SidebarButton = styled.button`
  background: linear-gradient(135deg, #2563eb, #1e40af);
  border: none;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 8px 16px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);

  &:hover {
    transform: scale(1.02);
    background: linear-gradient(135deg, #1e40af, #1e3a8a);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  }
  &:active {
    transform: scale(0.98);
  }
  span {
    font-size: 0.8rem;
    letter-spacing: 0.5px;
  }
`;

export const SpanTitleHora = styled.span`
  font-size: clamp(0.85rem, 1.2vw, 1.1rem);
  font-weight: 600;
  color: #64748b7a;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  opacity: 0.9;
`;
export const SpanHora = styled.span`
    font-size: 42px;
    font-weight: 800;
    color: #252525;
    letter-spacing: 6px;
`;


// Container para empilhar a hora e a data
export const DateTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // ou flex-end, dependendo de onde fica na navbar
  line-height: 1.2;
`;

// A hora fica em destaque (maior ou mais em negrito)
export const TimeText = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333; // Ajuste para a cor do seu tema
`;

// A data fica como informação secundária (menor e mais clara)
export const DateText = styled.span`
  font-size: 0.8rem;
  color: #888; // Uma cor mais neutra/opaca
`;

