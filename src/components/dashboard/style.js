import styled from "styled-components";

export const Body = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const TablesContainer = styled.div`
  flex: 1;
  display: flex;
  gap: 30px;

  padding: 10px 20px;
  overflow: hidden;

  @media (max-width: 1200px) {
    gap: 20px;
    padding: 10px 15px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    padding: 10px 10px;
    overflow-y: auto;
  }
`;

export const DivTudo = styled.div`
  flex: 1;
  height: 100%; /*  1. Garante que a div externa ocupe toda a altura do container pai */
`;

export const TableWrapper = styled.div`
  width: 100%;
  height: 100%; /* 2. Repassa essa altura total para o wrapper da tabela */
  background-color: white; /* Mantém o fundo branco caso falte alguma coisa */
`;

export const Table = styled.table`
  width: 100%;
  height: 100%; /*  3. A MÁGICA: Faz a tabela esticar e preencher todo o espaço vazio */
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
`;

export const Thead = styled.thead`
  background: #1e3a8a;
  color: white;
  height: 1px; /* 4. Trava a altura do cabeçalho para que apenas as linhas da tabela (Tbody) estiquem */

  th {
    font-size: clamp(14px, 1vw, 20px);
    padding: 10px 12px;
    text-align: left;
  }

  .th-action {
    width: 72px;
    text-align: center;
  }

  @media (max-width: 768px) {
    th {
      font-size: clamp(12px, 2vw, 16px);
      padding: 8px 10px;
    }
  }

  @media (max-width: 640px) {
    th {
      font-size: 12px;
      padding: 6px 8px;
    }
  }
`;

export const Tbody = styled.tbody`

.td-turma {
  color: #111827 !important;
  font-weight: bold !important;
}

tr {
  text-align: left;
  background-color: white;
}
  tr:nth-child(even) {
    background: #e5e7eb;
  }

  tr:hover {
    background: #dbeafe;
  }

  th,
  td {
    padding: 8px 12px;
    font-size: 18px;
    border-bottom: 1px solid #d1d5db;
    line-height: 1.2;
  }

  th {
    font-weight: 600;
    color: #111827;
  }

  td {
    color: #374151;
  }

  .td-action {
    text-align: center;
  }

  .action-button {
    width: 38px;
    height: 38px;
    border: none;
    border-radius: 50%;
    background: #dbeafe;
    color: #1d4ed8;
    font-size: 1.2rem;
    font-weight: 800;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .action-button:hover {
    background: #2563eb;
    color: white;
    transform: translateX(2px);
  }
`;
