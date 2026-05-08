import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 768px) {
    padding: 15px;
    gap: 20px;
  }

  @media (max-width: 640px) {
    padding: 10px;
    gap: 15px;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 15px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 12px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 640px) {
    border-radius: 12px;
  }
`;

export const MediaArea = styled.div`
  width: 100%;
  height: 200px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 180px;
  }

  @media (max-width: 640px) {
    height: 150px;
  }
`;

export const Media = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

  &[as='video'] {
    width: 100%;
    height: 100%;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;

  @media (max-width: 640px) {
    padding: 12px;
    gap: 10px;
  }
`;

export const Status = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
  width: fit-content;
  
  background-color: ${({ active }) => active ? '#dcfce7' : '#fee2e2'};
  color: ${({ active }) => active ? '#166534' : '#991b1b'};

  @media (max-width: 640px) {
    font-size: 0.8rem;
    padding: 5px 10px;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;

  @media (max-width: 640px) {
    gap: 6px;
  }
`;

export const Button = styled.button`
  flex: 1;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 8px 10px;
  }

  @media (max-width: 640px) {
    font-size: 0.8rem;
    padding: 6px 8px;
  }
`;

export const ButtonPrimary = styled(Button)`
  background: #2563eb;
  color: white;

  &:hover {
    background: #1e40af;
  }
`;

export const ButtonDanger = styled(Button)`
  background: #dc2626;
  color: white;

  &:hover {
    background: #991b1b;
  }
`;
