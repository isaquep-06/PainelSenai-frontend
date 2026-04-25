import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 92vh;
  padding: 24px;
  background: #f8fafc;
  font-family: "Inter", sans-serif;
`;

export const Header = styled.div`
  margin-bottom: 24px;

  h1 {
    font-size: 1.6rem;
    color: #0f172a;
    margin-bottom: 4px;
  }

  p {
    color: #64748b;
    font-size: 0.9rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;

  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;

  transition: 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  h2 {
    font-size: 0.9rem;
    color: #64748b;
    margin-bottom: 10px;
    font-weight: 500;
  }

  strong {
    font-size: 2rem;
    color: #1e3a8a;
  }
`;