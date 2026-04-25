import styled from "styled-components";

export const PageContainer = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(145deg, #f8fafc 0%, #dbeafe 50%, #e2e8f0 100%);
`;

export const Content = styled.section`
  width: 100%;
  max-width: 560px;
  padding: 40px 32px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.12);
  border: 1px solid rgba(37, 99, 235, 0.12);
  text-align: center;

  @media (max-width: 640px) {
    padding: 32px 20px;
    border-radius: 24px;
  }
`;

export const Code = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 84px;
  height: 36px;
  padding: 0 14px;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 0.9rem;
  font-weight: 700;
`;

export const Title = styled.h1`
  margin: 18px 0 12px;
  color: #0f172a;
  font-size: clamp(2rem, 5vw, 3.2rem);
  line-height: 1.05;
`;

export const Description = styled.p`
  margin: 0 auto;
  max-width: 420px;
  color: #475569;
  font-size: 1rem;
  line-height: 1.6;
`;

export const Actions = styled.div`
  margin-top: 28px;
  display: flex;
  justify-content: center;
`;

export const DashboardButton = styled.button`
  min-width: 190px;
  height: 48px;
  padding: 0 18px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #ffffff;
  font-size: 0.98rem;
  font-weight: 700;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 28px rgba(37, 99, 235, 0.24);
  }
`;
