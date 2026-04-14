import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  right: 0;
  bottom: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);

  padding: 16px 14px;
  border-radius: 18px 0 0 18px;

  box-shadow: -4px 4px 20px rgba(0, 0, 0, 0.12);

  width: clamp(140px, 12vw, 240px);

  z-index: 10;
`;

export const Title = styled.h1`
  font-size: clamp(12px, 1vw, 18px);
  font-weight: 600;
  text-align: center;
  color: #111827;

  margin: 0;
`;

export const QRWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1/1;

  background: white;
  padding: 8px;
  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const QRImg = styled.img`
  width: 100%;
  height: 100%;

  object-fit: contain;
`;

export const Description = styled.span`
  font-size: clamp(10px, 0.9vw, 14px);
  color: #374151;
  text-align: center;

  opacity: 0.9;
`;

export const Signature = styled.span`
  font-size: clamp(9px, 0.7vw, 12px);
  color: #6b7280;

  opacity: 0.6;
`;