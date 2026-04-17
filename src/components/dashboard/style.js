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
`;

export const DivTudo = styled.div`
  flex: 1;
  height: 100%; /* 🔥 1. Garante que a div externa ocupe toda a altura do container pai */
`;

export const TableWrapper = styled.div`
  width: 100%;
  height: 100%; /* 🔥 2. Repassa essa altura total para o wrapper da tabela */
  background-color: white; /* Mantém o fundo branco caso falte alguma coisa */
`;

export const Table = styled.table`
  width: 100%;
  height: 100%; /* 🔥 3. A MÁGICA: Faz a tabela esticar e preencher todo o espaço vazio */
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
`;

export const Thead = styled.thead`
  background: #1e3a8a;
  color: white;
  height: 1px; /* 🔥 4. Trava a altura do cabeçalho para que apenas as linhas da tabela (Tbody) estiquem */

  th {
    font-size: clamp(14px, 1vw, 20px);
    padding: 10px 12px;
    text-align: left;
  }
`;

export const Tbody = styled.tbody`
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
    font-size: 21px;
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
`;