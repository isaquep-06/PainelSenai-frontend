import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 1024px) {
    padding: 30px 16px;
    gap: 30px;
  }

  @media (max-width: 768px) {
    padding: 20px 12px;
    gap: 24px;
  }

  @media (max-width: 640px) {
    padding: 16px 10px;
    gap: 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
  }

  p {
    font-size: 1.1rem;
    color: #6b7280;
    margin: 0;
  }

  @media (max-width: 1024px) {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }

  @media (max-width: 768px) {
    gap: 8px;

    h1 {
      font-size: 1.75rem;
    }

    p {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const Card = styled.div`
  background: linear-gradient(135deg, #2563eb, #1e40af);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: white;

  h2 {
    font-size: 1rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    letter-spacing: 0.5px;
  }

  strong {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(37, 99, 235, 0.25);
  }

  @media (max-width: 1024px) {
    padding: 20px;
    gap: 12px;

    h2 {
      font-size: 0.95rem;
    }

    strong {
      font-size: 2.2rem;
    }

    &:hover {
      transform: translateY(-6px);
    }
  }

  @media (max-width: 768px) {
    padding: 16px;
    gap: 10px;
    border-radius: 12px;

    h2 {
      font-size: 0.9rem;
    }

    strong {
      font-size: 2rem;
    }

    &:hover {
      transform: translateY(-4px);
    }
  }

  @media (max-width: 640px) {
    padding: 14px;
    gap: 8px;
    border-radius: 10px;

    h2 {
      font-size: 0.85rem;
    }

    strong {
      font-size: 1.75rem;
    }

    &:hover {
      transform: translateY(-2px);
    }
  }
`;
