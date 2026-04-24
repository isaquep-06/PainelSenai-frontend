import styled from "styled-components";

export const Nav = styled.nav`
  width: 100%;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 24px;

  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;

  font-family: "Inter", sans-serif;

  position: sticky;
  top: 0;
  z-index: 1000;

  box-shadow: -1px -2px 7px #1e1e1e52;
`;

/* =========================
   LISTA (ESQUERDA)
========================= */
export const UL = styled.ul`
  display: flex;
  align-items: center;
  gap: 14px;

  list-style: none;
  padding: 0;
  margin: 0;
`;

/* =========================
   ITEM DE NAVEGAÇÃO
========================= */
export const LIAtualizacoes = styled.li`
  padding: 8px 16px;
  border-radius: 12px;

  font-size: 0.9rem;
  font-weight: 600;

  cursor: pointer;

  color: #1e293b;
  background: #f1f5f9;

  transition: 0.2s ease;

  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.97);
  }
`;

/* =========================
   LOGO CENTRAL
========================= */
export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 42px;
    object-fit: contain;
  }
`;

/* =========================
   USUÁRIO (DIREITA)
========================= */
export const LINome = styled.li`
padding: 8px 14px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 10px;

    b {
      color: rgb(14, 95, 177);
    }
`;