import styled, { keyframes } from 'styled-components';

// Animação de entrada com efeito 'Spring' (mais natural e fluida)
const springUp = keyframes`
  0% { opacity: 0; transform: translateY(40px) scale(0.95); }
  60% { transform: translateY(-5px) scale(1.02); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

export const Container = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999; /* Z-index alto de verdade para não sumir atrás de modais */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  padding: 16px;
  
  /* Glassmorphism REAL e Otimizado */
  background: rgba(255, 255, 255, 0.65); /* Transparência ideal */
  backdrop-filter: blur(16px); /* Blur forte para compensar a transparência */
  -webkit-backdrop-filter: blur(16px);
  
  /* Bordas sutis para destacar o vidro */
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  
  /* Sombra elegante com tons de azul Senai */
  box-shadow: 0 10px 30px rgba(0, 74, 165, 0.15),
              inset 0 0 0 1px rgba(255, 255, 255, 0.5);
              
  animation: ${springUp} 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 15px 35px rgba(0, 74, 165, 0.25),
                inset 0 0 0 1px rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 768px) {
    bottom: 16px;
    right: 16px;
    width: 120px;
    padding: 12px;
    border-radius: 16px;
  }
`;

export const Title = styled.h3`
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
  text-align: center;
  color: #004AA5; /* Azul Escuro SENAI para máxima legibilidade */

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 768px) {
    font-size: 0.65rem;
    margin: 0 0 8px 0;
  }
`;

export const QRWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 12px;
  padding: 6px;
  margin-bottom: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 160, 227, 0.2); /* Borda Azul Claro SENAI */
  transition: transform 0.3s ease;

  /* Sem cursor: pointer falso e sem brilho poluente */
  
  ${Container}:hover & {
    transform: scale(1.05); /* Destaque sutil acionado pelo Container */
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const QRImg = styled.img`
  display: block;
  width: 100%;
  max-width: 90px;
  height: auto;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    max-width: 75px;
  }
`;

export const Description = styled.span`
  font-size: 0.65rem;
  font-weight: 600;
  color: #004AA5;
  background: rgba(0, 160, 227, 0.15); /* Fundo sutil Azul Claro */
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 6px;
  text-align: center;

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 768px) {
    font-size: 0.6rem;
    padding: 3px 8px;
  }
`;

export const Signature = styled.span`
  font-size: 0.6rem;
  font-weight: 500;
  color: #64748B;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  ${Container}:hover & {
    opacity: 1; /* Revela a assinatura no hover */
  }

  @media (max-width: 768px) {
    display: none;
  }
`;