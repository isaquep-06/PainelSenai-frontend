import styled from "styled-components";

// =====================
//  BASE / LAYOUT (SEM SCROLL GLOBAL)
// =====================
export const Body = styled.div`
  width: 100%;
  height: 100vh;          // 🔥 trava a altura na tela
  overflow: hidden;       // 🔥 remove scroll da página

  background: linear-gradient(145deg, #f1f5f9 0%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
`;

// =====================
//  MAIN CONTENT
// =====================
export const MainContent = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  padding: 5px 24px;
  transition: all 0.2s ease;
  overflow: auto;

  @media (max-width: 1280px) {  // 👈 ganha espaço antes do zoom necessário
    padding: 16px 20px;
    gap: 16px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 24px;
    padding: 16px;
    overflow: auto;
  }

  @media (max-width: 640px) {
    padding: 12px;
    gap: 16px;
  }
`;

// =====================
//  TABELAS
// =====================
export const TablesContainer = styled.div`
  flex: 1.2;
  display: flex;
  gap: 20px;
  min-width: 0;
  height: 100%;
  overflow: hidden;

  & > * {
    flex: 1;
    min-width: 0;
  }

  // 👇 empilha as tabelas antes de precisar de zoom
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 20px;
    overflow: visible;
  }

  @media (max-width: 1024px) {
    gap: 16px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
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
  height: 100%;
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

// =====================
//  VÍDEO / ANÚNCIO
// =====================
export const VideoContainer = styled.div`
  border-radius: 28px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 1px 3px 3px 0px rgb(0 0 0 / 50%);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;

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

  @media (max-width: 640px) {
    padding: 16px 10px;
    gap: 8px;

    img {
      width: 90px;
    }
  }
`;

// =====================
//  TABELA GLOBAL (AJUSTADA - SEM ZOOM NECESSÁRIO)
// =====================
export const StyledTable = styled.div`
  background: white;
  border-radius: 24px;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  width: 100%;
  height: 100%;
  overflow: auto; // scroll interno vertical + horizontal se necessário

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
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