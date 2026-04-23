import styled from "styled-components";

// =====================
// CONTAINER GERAL
// =====================
export const FormContainer = styled.div`
  width: 100%;
  max-width: 520px;
  margin: auto;

  background: white;
  border-radius: 20px;
  padding: 24px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
`;

// =====================
// FORM
// =====================
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// =====================
// GRUPO DE INPUT
// =====================
export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

// =====================
// LABEL
// =====================
export const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: #334155;
`;

// =====================
// INPUT
// =====================
export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;

  border-radius: 10px;
  border: 1px solid #cbd5f5;

  font-size: 0.85rem;

  transition: 0.2s;

  &:focus {
    outline: none;
    border-color: #003e7e;
    box-shadow: 0 0 0 2px rgba(0, 62, 126, 0.15);
  }
`;

// =====================
// ERRO
// =====================
export const Error = styled.span`
  font-size: 0.7rem;
  color: #dc2626;
`;

// =====================
// HEADER DO FORM
// =====================
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;

  h2 {
    font-size: 1.2rem;
    font-weight: 700;
    color: #003e7e;
  }

  span {
    font-size: 0.8rem;
    color: #64748b;
  }
`;