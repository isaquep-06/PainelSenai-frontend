import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast-container {
    width: 100%;
    max-width: 420px;
    padding: 12px;

    @media (max-width: 768px) {
      width: calc(100% - 20px);
      max-width: none;
      padding: 0;
      left: 10px;
      right: 10px;
    }
  }

  .Toastify__toast {
    width: 100%;
    margin-bottom: 12px;
    min-height: auto;

    border-radius: 14px;
    background: #ffffff;
    color: #333;
    font-weight: 600;
    font-size: 0.95rem;

    padding: 14px 16px;

    box-shadow: 0 10px 24px rgba(0,0,0,0.14);
    border-left: 6px solid #005da5;

    word-break: break-word;

    @media (max-width: 768px) {
      font-size: 0.92rem;
      padding: 13px 14px;
      border-radius: 12px;
    }

    @media (max-width: 480px) {
      font-size: 0.88rem;
      padding: 12px;
      border-left-width: 5px;
    }
  }

  .Toastify__toast-body {
    margin: 0;
    padding: 0;
    line-height: 1.4;
    font-family: "Roboto", "Segoe UI", sans-serif;
  }

  .Toastify__close-button {
    color: #666;
    opacity: .75;

    &:hover {
      opacity: 1;
    }
  }

  .Toastify__progress-bar {
    height: 4px;
    background: #005da5;
  }

  /* STATUS */

  .Toastify__toast--success {
    border-left-color: #16a34a;
    color: #166534;
  }

  .Toastify__toast--success .Toastify__progress-bar {
    background: #16a34a;
  }

  .Toastify__toast--error {
    border-left-color: #dc2626;
    color: #991b1b;
  }

  .Toastify__toast--error .Toastify__progress-bar {
    background: #dc2626;
  }

  .Toastify__toast--info {
    border-left-color: #2563eb;
    color: #1e40af;
  }

  .Toastify__toast--info .Toastify__progress-bar {
    background: #2563eb;
  }

  .Toastify__toast--warning {
    border-left-color: #f59e0b;
    color: #92400e;
  }

  .Toastify__toast--warning .Toastify__progress-bar {
    background: #f59e0b;
  }
`;