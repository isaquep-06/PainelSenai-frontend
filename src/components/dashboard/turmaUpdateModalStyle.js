import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(4px);
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 620px;
  background: white;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.28);
`;

export const TopBar = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
`;

export const TitleGroup = styled.div`
  h2 {
    margin: 0 0 6px;
    color: #0f172a;
  }

  span {
    color: #64748b;
    font-size: 0.95rem;
  }
`;

export const CloseButton = styled.button`
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background: #e2e8f0;
  color: #334155;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div`
  padding: 16px;
  border-radius: 18px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;

  span {
    display: block;
    margin-bottom: 8px;
    color: #64748b;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  strong {
    color: #0f172a;
    font-size: 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 700;
  color: #334155;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #0f172a;
  transition: 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px
      rgba(37, 99, 235, 0.15);
  }
`;
