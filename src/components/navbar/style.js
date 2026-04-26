// style.js
import styled from "styled-components";

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 10px 24px;
  margin-bottom: 5px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  font-family: "Inter", sans-serif;
  position: relative;
  z-index: 10;
  flex-wrap: wrap;

  /* MOBILE NORMAL (retrato) */
  @media (max-width: 768px) {
    padding: 10px 12px;
    gap: 10px;
    justify-content: center;
  }

  /* MOBILE HORIZONTAL */
  @media (max-width: 950px) and (orientation: landscape) {
    flex-wrap: nowrap;
    padding: 6px 12px;
    gap: 8px;
    min-height: auto;
    justify-content: space-between;
  }
`;

export const Logo = styled.img`
  width: 220px;
  height: 40px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 160px;
    height: 30px;
  }

  @media (max-width: 950px) and (orientation: landscape) {
    width: 120px;
    height: 24px;
  }
`;

export const UL = styled.ul`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  /* MOBILE HORIZONTAL */
  @media (max-width: 950px) and (orientation: landscape) {
    width: auto;
    flex-wrap: nowrap;
    gap: 6px;
  }
`;

export const LiClick = styled.li`
  list-style: none;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: 0.25s;
  color: ${({ active }) =>
    active ? "#fff" : "#1f2937"};
  background: ${({ active }) =>
    active ? "#0063ff" : "transparent"};
  white-space: nowrap;

  &:hover {
    background: ${({ active }) =>
    active ? "#0063ff" : "#f1f5f9"};
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 7px 10px;
  }

  /* MOBILE HORIZONTAL */
  @media (max-width: 950px) and (orientation: landscape) {
    font-size: 11px;
    padding: 5px 8px;
  }
`;

export const SidebarButton = styled.button`
  background: linear-gradient(135deg, #2563eb, #1e40af);
  border: none;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 8px 16px;
  border-radius: 40px;
  cursor: pointer;
  transition: 0.2s;
  white-space: nowrap;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 220px;
  }

  /* MOBILE HORIZONTAL */
  @media (max-width: 950px) and (orientation: landscape) {
    width: auto;
    max-width: none;
    font-size: 11px;
    padding: 6px 10px;
  }
`;

export const DateTimeUL = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 0;
  margin: 0;
  list-style: none;

  /* desktop */
  flex-direction: row;

  /* celular retrato */
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }

  /* celular horizontal */
  @media (max-width: 950px) and (orientation: landscape) {
    flex-direction: row;
    width: auto;
    gap: 10px;
  }
`;

export const DateBlock = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 120px;

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
  }

  @media (max-width: 950px) and (orientation: landscape) {
    min-width: auto;
  }
`;

export const SpanTitleHora = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
`;

export const SpanHora = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: #252525;
  letter-spacing: 1px;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  /* MOBILE HORIZONTAL */
  @media (max-width: 950px) and (orientation: landscape) {
    font-size: 14px;
    letter-spacing: 0;
  }
`;