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
    padding: 10px;
    overflow: hidden;
  }
`;

export const DivTudo = styled.div`
  flex: 1;
  height: 100%;
  min-height: 0;
  min-width: 0;

  @media (max-width: 1100px) {
    height: auto;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  background-color: white;
  min-width: 0;
  overflow-x: auto;
  overflow-y: auto;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;

  @media (max-width: 1100px) {
    height: auto;
    max-height: min(70vh, 560px);
  }
`;

export const Table = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  font-family: "Inter", sans-serif;
  table-layout: auto;
  min-width: ${({ "data-has-actions": hasActions }) =>
    hasActions ? "440px" : "360px"};
`;

export const Thead = styled.thead`
  background: #1e3a8a;
  color: white;
  height: 1px;

  th {
    font-size: 0.95rem;
    padding: 8px 10px;
    text-align: left;
  }

  .th-action {
    width: 48px;
    text-align: center;
  }

  @media (max-width: 768px) {
    th {
      font-size: 0.78rem;
      padding: 7px 8px;
    }
  }

  @media (max-width: 640px) {
    th {
      font-size: 0.72rem;
      padding: 6px 7px;
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
    padding: 5px 8px;
    font-size: 0.95rem;
    border-bottom: 1px solid #d1d5db;
    line-height: 1.05;
    white-space: nowrap;
    min-width: 0;
  }

  th {
    font-weight: 600;
    color: #111827;
  }

  td {
    color: #374151;
    font-size: 0.95rm;
  }

  .td-turma,
  td:nth-child(2) {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .td-action {
    text-align: center;
    width: 48px;
  }

  .action-button {
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 50%;
    background: #dbeafe;
    color: #1d4ed8;
    font-size: 0.78rem;
    font-weight: 800;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .action-button:hover {
    background: #2563eb;
    color: white;
    transform: translateX(2px);
  }

  ${TableWrapper}[data-density="compact"] & th,
  ${TableWrapper}[data-density="compact"] & td {
    padding: 4px 7px;
    font-size: 1.1rem;
  }

  ${TableWrapper}[data-density="compact"] & .action-button {
    width: 22px;
    height: 22px;
    font-size: 0.72rem;
  }

  ${TableWrapper}[data-density="dense"] & th,
  ${TableWrapper}[data-density="dense"] & td {
    padding: 3px 6px;
    font-size: 0.68rem;
    line-height: 1;
  }

  ${TableWrapper}[data-density="dense"] & .action-button {
    width: 18px;
    height: 18px;
    font-size: 0.62rem;
  }

  @media (max-width: 768px) {
    th,
    td {
      font-size: 0.76rem;
      padding: 7px 8px;
    }
  }
`;
