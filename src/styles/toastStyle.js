import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    /* O azul padrão SENAI costuma ser o #005DA5 ou similar */
    border-radius: 4px; /* Menos arredondado, mais industrial/sério */
    background: #ffffff;
    color: #333333;
    font-weight: 600;
    font-size: 0.95rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 16px;
    border-left: 8px solid #005da5; /* Barra lateral de destaque */
  }

  .Toastify__toast-body {
    /* Fontes robustas como Roboto ou Arial remetem ao ambiente técnico */
    font-family: 'Roboto', 'Segoe UI', sans-serif;
    padding: 0;
  }

  .Toastify__progress-bar {
    background: #005da5; /* Azul SENAI */
    height: 4px;
  }

  .Toastify__close-button {
    color: #666;
    opacity: 0.7;
  }

  /* Variantes de Status */
  .Toastify__toast--success {
    border-left: 8px solid #0d854d; 
    color: #155724;
    background-color: #fff;
    .Toastify__progress-bar { background: #28a745; }
  }
  
  .Toastify__toast--error {
    border-left: 8px solid #ff0000; /* Vermelho padrão de alertas */
    color: #721c24;
    .Toastify__progress-bar { background: #ff0000; }
  }

  .Toastify__toast--info {
    border-left: 8px solid #005da5;
    color: #004085;
  }
`;