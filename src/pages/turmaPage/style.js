import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(145deg, #f1f5f9 0%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
`;

export const FormArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 24px;
  margin: 0 20px 40px 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 48px;
  box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.1);

  @media (max-width: 640px) {
    margin: 12px;
    padding: 16px;
    border-radius: 32px;
  }
`;