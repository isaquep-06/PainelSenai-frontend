import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 24px;
    max-width: 100%;
    border-radius: 12px;
    gap: 16px;
  }

  @media (max-width: 640px) {
    padding: 16px;
    border-radius: 10px;
    gap: 12px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 640px) {
    gap: 6px;
  }
`;

export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f2937;

  @media (max-width: 640px) {
    font-size: 0.9rem;
  }
`;

export const Input = styled.input`
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  @media (max-width: 640px) {
    padding: 10px 12px;
    font-size: 0.9rem;
    border-radius: 6px;
  }
`;

export const Select = styled.select`
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  @media (max-width: 640px) {
    padding: 10px 12px;
    font-size: 0.9rem;
    border-radius: 6px;
  }
`;

export const TextArea = styled.textarea`
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  @media (max-width: 640px) {
    padding: 10px 12px;
    font-size: 0.9rem;
    border-radius: 6px;
    min-height: 100px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;

  @media (max-width: 640px) {
    gap: 8px;
    flex-direction: column;
  }
`;

export const Button = styled.button`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 0.9rem;
  }

  @media (max-width: 640px) {
    padding: 10px 12px;
    font-size: 0.85rem;
    width: 100%;
  }
`;

export const ButtonPrimary = styled(Button)`
  background: #2563eb;
  color: white;

  &:hover {
    background: #1e40af;
  }
`;

export const ButtonSecondary = styled(Button)`
  background: #e5e7eb;
  color: #1f2937;

  &:hover {
    background: #d1d5db;
  }
`;

export const ButtonDanger = styled(Button)`
  background: #dc2626;
  color: white;

  &:hover {
    background: #991b1b;
  }
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const ConfirmMessage = styled.div`
  background: #fef3c7;
  border: 1px solid #fbbf24;
  border-radius: 8px;
  padding: 16px;
  color: #92400e;
  font-size: 0.95rem;

  @media (max-width: 640px) {
    padding: 12px;
    font-size: 0.9rem;
    border-radius: 6px;
  }
`;
