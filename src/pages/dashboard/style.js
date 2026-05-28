import styled from "styled-components";

// =====================
//  BASE / LAYOUT (SEM SCROLL GLOBAL)
// =====================
export const Body = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  overflow-x: hidden;

  background: linear-gradient(145deg, #f1f5f9 0%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;

  @media (max-width: 640px) {
    min-height: 100vh;
  }
`;

// =====================
//  CAMPO DE PESQUISA (MOBILE)
// =====================
export const SearchContainer = styled.div`
  display: none;
  padding: 0 16px 12px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  @media (max-width: 640px) {
    padding: 0 12px 10px;
    gap: 6px;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #2563eb;
  }

  &::placeholder {
    color: #94a3b8;
  }

  @media (max-width: 640px) {
    padding: 10px 12px;
    font-size: 0.9rem;
    border-radius: 8px;
  }
`;

export const ClearButton = styled.button`
  background: #e2e8f0;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #cbd5e1;
    color: #475569;
  }

  @media (max-width: 640px) {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
`;

// =====================
//  MAIN CONTENT
// =====================
export const MainContent = styled.div`
  flex: 1;
  display: flex;
  gap: 5px;
  padding: 5px;
  transition: all 0.2s ease;
  overflow: hidden;
  align-items: stretch;
  min-height: 0;

  @media (max-width: 1280px) {
    padding: 16px 20px;
    gap: 16px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 24px;
    padding: 16px;
    min-height: 0;
  }

  @media (max-width: 768px) {
    padding: 14px;
    gap: 16px;
  }

  @media (max-width: 640px) {
    padding: 10px;
    gap: 12px;
    min-height: 0;
  }
`;

// =====================
//  TABELAS
// =====================
export const TablesContainer = styled.div`
  flex: 1.2;
  display: flex;
  gap: 5px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  align-items: stretch;

  & > * {
    flex: 1;
    min-width: 0;
    min-height: 0;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 5px;
    overflow: hidden;
  }

  @media (max-width: 1024px) {
    gap: 5px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }

  @media (max-width: 640px) {
    gap: 5px;
  }
`;

// =====================
//  LADO DIREITO
// =====================
export const RightSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 280px;
  min-height: 0;

  @media (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    min-height: 0;
  }

  @media (max-width: 768px) {
    gap: 16px;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
    min-width: 100%;
  }
`;

// =====================
//  VÍDEO / ANÚNCIO
// =====================
export const VideoContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 1px 3px 3px 0px rgb(0 0 0 / 50%);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  min-height: 0;
  height: 100%;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 12px 28px rgba(0, 62, 126, 0.15);
  }

  video, img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  img {
    object-fit: fill;
    background: #00000010;
  }

  @media (max-width: 1024px) {
    border-radius: 20px;
    min-height: 220px;
  }

  @media (max-width: 768px) {
    border-radius: 16px;
    min-height: 220px;
  }

  @media (max-width: 640px) {
    border-radius: 12px;
    min-height: 180px;
  }
`;

// =====================
//  QR CODE
// =====================
export const QrContainer = styled.div`
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-radius: 32px;
  padding: 20px 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 153, 218, 0.2);
  transition: all 0.25s ease;

  width: 100%;
  height: 100%;
  min-height: 300px;

  &:hover {
    transform: translateY(-6px);
    border-color: #0099da;
    box-shadow: 0 20px 30px -12px rgba(0, 98, 139, 0.2);
    background: white;
  }

  img {
    width: min(140px, 35%);
    height: auto;
    border-radius: 20px;
    transition: 0.2s;
  }

  h2 {
    font-size: clamp(0.9rem, 4vw, 1.3rem);
    font-weight: 700;
    color: #003e7e;
    margin: 0;
  }

  p {
    font-size: clamp(0.7rem, 3vw, 0.85rem);
    color: #1e293b;
    margin: 0;
  }

  span {
    font-size: 0.65rem;
    color: #5b6e8c;
  }

  @media (max-width: 1024px) {
    border-radius: 24px;
    padding: 16px 10px;
    gap: 10px;
    min-height: 250px;
  }

  @media (max-width: 768px) {
    border-radius: 20px;
    padding: 14px 10px;
    gap: 8px;
    min-height: 220px;

    img {
      width: min(120px, 40%);
    }
  }

  @media (max-width: 640px) {
    border-radius: 16px;
    padding: 12px 8px;
    gap: 6px;
    min-height: 180px;

    img {
      width: 90px;
    }

    h2 {
      font-size: 0.95rem;
    }

    p {
      font-size: 0.8rem;
    }
  }
`;

// =====================
//  TABELA GLOBAL (AJUSTADA - SEM ZOOM NECESSÁRIO)
// =====================
export const StyledTable = styled.div`
  background: white;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  width: 100%;
  height: 100%;
  overflow: auto; // scroll interno vertical + horizontal se necessário

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1.1rem;
    min-width: 320px; // 👈 reduzido de 400px para caber sem zoom
  }

  th, td {
    padding: 10px 8px; // 👈 reduzido de 12px para ganhar espaço
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
    white-space: nowrap; // 👈 evita quebra de linha desnecessária
  }

  th {
    background: #f8fafc;
    color: #0f172a;
    font-weight: 600;
    position: sticky;
    top: 0;
  }

  // Para telas menores, permite quebra de linha e diminui padding
  @media (max-width: 768px) {
    th, td {
      white-space: normal;
      padding: 8px 6px;
      font-size: 0.75rem;
    }
    table {
      min-width: 280px;
    }
  }

  @media (max-width: 640px) {
    th, td {
      padding: 6px 4px;
      font-size: 0.7rem;
    }
  }
`;
