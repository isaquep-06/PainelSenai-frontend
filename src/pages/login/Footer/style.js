import styled from "styled-components";

export const Footer = styled.footer`
  background-color: #1e3a8a;
  color: white;

  width: 100%;
  padding: 14px 40px;

  position: fixed;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 14px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    padding: 12px 20px;
    justify-content: center;
  }

  @media (max-width: 640px) {
    font-size: 12px;
    padding: 10px 15px;
    gap: 8px;
  }

  /* bloco central (copyright) */
  .div-center {
    display: flex;
    justify-content: center;
    flex: 1;
    text-align: center;
  }

  /* bloco da esquerda (caso queira usar depois) */
  .div-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  /* bloco da direita (contatos) */
  .div-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    font-size: 13px;
    opacity: 0.9;
  }
`;