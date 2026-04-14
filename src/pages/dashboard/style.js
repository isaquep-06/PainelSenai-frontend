import styled from "styled-components";

export const Body = styled.div`
  width: 100%;
  height: 100vh;
  background: #d8d8d8;

  display: flex;
  flex-direction: column;
`;

/* 🔥 ÁREA PRINCIPAL */
export const MainContent = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
  padding: 8px;
`;

/* 📊 TABELAS */
export const TablesContainer = styled.div`
  flex: 1.2;
  display: flex;
  gap: 6px;

  & > * {
    flex: 1;
  }
`;

/* 🎬 LADO DIREITO */
export const RightSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 92vh;
`;

/* 🎥 VIDEO / ANÚNCIO */
export const VideoContainer = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

/* 📱 QR CODE */
export const QrContainer = styled.div`
  flex: 1;
  background: #a7f3d0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 10px;
  text-align: center;

  img {
    width: 140px;
    height: 140px;
  }

  h2 {
    font-size: clamp(14px, 1vw, 22px);
    color: #111;
  }
`;