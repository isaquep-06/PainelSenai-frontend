import styled from 'styled-components';

export const UploadContainer = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border-radius: 22px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.18);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 16px;
    gap: 15px;
  }

  @media (max-width: 640px) {
    padding: 12px;
    border-radius: 12px;
    gap: 10px;
    flex-direction: column;
    align-items: stretch;
  }
`;

export const LeftArea = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    align-items: flex-start;
  }
`;

export const Label = styled.span`
  color: #fff;
  font-size: 24px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

export const SubLabel = styled.span`
  color: #cbd5e1;
  font-size: 14px;
  margin-top: 4px;

  @media (max-width: 640px) {
    font-size: 12px;
  }
`;

export const RightArea = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    gap: 10px;
    width: 100%;
    flex-direction: column;
  }
`;

export const FileLabel = styled.label`
  background: #fff;
  color: #0f172a;
  padding: 12px 18px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  min-width: 230px;
  text-align: center;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #e5e7eb;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    min-width: 180px;
    padding: 10px 16px;
    font-size: 0.9rem;
  }

  @media (max-width: 640px) {
    min-width: 100%;
    padding: 10px 12px;
    font-size: 0.85rem;
  }
`;

export const Input = styled.input`
  display: none;
`;

export const Button = styled.button`
  background: #2563eb;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1e40af;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  @media (max-width: 640px) {
    padding: 10px 16px;
    font-size: 0.85rem;
    min-width: 100%;
  }
`;
