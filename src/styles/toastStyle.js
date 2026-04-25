import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const StyledToastContainer = styled(ToastContainer)`
  /* Container geral */
  .Toastify__toast-container {
    width: auto;
    max-width: 420px;
    padding: 12px;

    @media (max-width: 768px) {
      width: 60%;
      max-width: 100%;
      left: 0;
      right: 0;
      padding: 10px;
    }

    @media (max-width: 480px) {
      padding: 8px;
    }
  }

  /* Toast */
  .Toastify__toast {
    border-radius: 10px;
    background: #ffffff;
    color: #333333;
    font-weight: 600;
    font-size: 0.95rem;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.14);
    padding: 14px 16px;
    min-height: auto;
    border-left: 8px solid #005da5;
    margin-bottom: 12px;
    word-break: break-word;

    @media (max-width: 768px) {
      width: 100%;
      margin-bottom: 10px;
      padding: 14px;
      font-size: 0.92rem;
      border-radius: 12px;
      width: 60%;
    }

    @media (max-width: 480px) {
      padding: 12px;
      font-size: 0.88rem;
      border-left-width: 6px;
      border-radius: 10px;
      width: 50%;
    }
  }

  /* Conteúdo interno */
  .Toastify__toast-body {
    font-family: "Roboto", "Segoe UI", sans-serif;
    padding: 0;
    margin: 0;
    line-height: 1.4;
  }

  /* Barra progresso */
  .Toastify__progress-bar {
    background: #005da5;
    height: 4px;

    @media (max-width: 480px) {
      height: 3px;
    }
  }

  /* Botão fechar */
  .Toastify__close-button {
    color: #666;
    opacity: 0.7;
    align-self: center;

    &:hover {
      opacity: 1;
    }
  }

  /* ===== STATUS ===== */

  .Toastify__toast--success {
    border-left-color: #0d854d;
    color: #155724;

    .Toastify__progress-bar {
      background: #28a745;
    }
  }

  .Toastify__toast--error {
    border-left-color: #ff0000;
    color: #721c24;

    .Toastify__progress-bar {
      background: #ff0000;
    }
  }

  .Toastify__toast--info {
    border-left-color: #005da5;
    color: #004085;

    .Toastify__progress-bar {
      background: #005da5;
    }
  }

  .Toastify__toast--warning {
    border-left-color: #ff9800;
    color: #7a4b00;

    .Toastify__progress-bar {
      background: #ff9800;
    }
  }
`;