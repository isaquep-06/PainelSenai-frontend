import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 998;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
`;

export const DragBar = styled.div`
  width: 52px;
  height: 6px;
  border-radius: 999px;
  background: #d1d5db;
  margin: 0 auto 8px auto;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 340px;
  height: 100vh;
  background: rgba(255,255,255,0.98);
  backdrop-filter: blur(12px);
  box-shadow: -8px 0 32px rgba(0,0,0,0.10);
  z-index: 999;

  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(100%)"};

  transition: all .35s ease;

  border-left: 4px solid #2563eb;
  overflow-y: auto;

  /* MOBILE */
  @media (max-width: 768px) {
    top: auto;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 88vh;
    border-left: none;
    border-top: 4px solid #2563eb;
    border-radius: 24px 24px 0 0;

    transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(100%)"};

    padding: 18px 16px 30px;
  }
`;

export const CloseButton = styled.button`
  background: #f3f4f6;
  border: none;
  font-size: 1.5rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  align-self: flex-end;
  transition: all 0.2s;
  color: #1f2937;
  &:hover {
    background: #e5e7eb;
    transform: rotate(90deg);
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #2563eb, #1e40af);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 8px 0;
  text-align: center;
`;

export const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  padding: 20px 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  border: 1px solid rgba(37, 99, 235, 0.2);
  transition: all 0.2s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 28px rgba(0, 0, 0, 0.08);
    border-color: #2563eb;
  }
`;

export const InfoIcon = styled.div`
  font-size: 2.5rem;
`;

export const InfoLabel = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  color: #6b7280;
`;

export const ClockValue = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  font-family: 'Monaco', monospace;
  color: #2563eb;
  background: #e0ecff;
  padding: 8px 16px;
  border-radius: 60px;
  letter-spacing: 2px;
`;

export const DateValue = styled.div`
  font-size: 0.9rem;
  color: #4b5563;
  font-weight: 500;
`;

export const UpdateValue = styled.div`
  font-size: 1rem;
  font-weight: 600;
  background: #f3f4f6;
  padding: 8px 12px;
  border-radius: 40px;
  color: #1f2937;
  width: 100%;
`;

export const RefreshButton = styled.button`
  background: #2563eb;
  border: none;
  color: white;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  transition: all 0.2s;
  margin-top: 8px;
  &:hover {
    background: #1e40af;
    transform: scale(1.02);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const Footer = styled.div`
  margin-top: 10px;
  text-align: center;
`;

export const SenaiBadge = styled.div`
  background: #003e7e;
  color: white;
  padding: 8px;
  border-radius: 40px;
  font-size: 0.7rem;
  font-weight: 500;
  width: fit-content;
  margin: 0 auto;
`;