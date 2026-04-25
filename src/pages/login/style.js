import styled from "styled-components";

export const DivPai = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
`;

/* 🔹 LADO ESQUERDO (FORM) */
export const DivContainerForm = styled.div`
  width: 35%;
  min-width: 320px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #ffffff;
  padding: 40px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;


export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  opacity: 0.6;
  transition: 0.2s;

  &:hover {
    opacity: 1;
  }

  img {
    width: 20px;
    height: auto;
  }
`;

/* 🔹 FORM */
export const Form = styled.form`
  width: 100%;
  max-width: 320px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: #334155;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;

  border-radius: 10px;
  border: 1px solid #cbd5f5;

  font-size: 0.9rem;

  transition: 0.2s;

  &:focus {
    outline: none;
    border-color: #003e7e;
    box-shadow: 0 0 0 2px rgba(0, 62, 126, 0.15);
  }
`;

export const Error = styled.span`
  font-size: 0.7rem;
  color: #dc2626;
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 12px;

  border-radius: 10px;
  border: none;

  font-weight: 600;
  font-size: 0.95rem;

  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: white;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/* 🔹 LADO DIREITO (IMAGEM) */
export const DivConainerLogin = styled.div`
  width: 65%;
  height: 100%;

  position: relative;

  @media (max-width: 900px) {
    display: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* overlay leve pra dar contraste */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.25);
  }
`;

export const DivImgLogo = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 24px;

img {
    width: 220px;
    height: auto;
}
`;
export const DivTitle = styled.div`
  position: fixed;
  top: 15%;
  right: 5%;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  text-align: right;
  padding: 16px 20px;
  border-radius: 12px;

  h1 {
    font-size: 32px;
    font-weight: 700;
    color: #1e74e6;
    margin: 0;
    text-shadow: #ababab94 -2px 2px 0px;
  }

  /* responsivo */
  @media (max-width: 900px) {
    position: static;
    align-items: center;
    text-align: center;
    margin-bottom: 20px;

    background: transparent;
    backdrop-filter: none;
    box-shadow: none;
  }
`;