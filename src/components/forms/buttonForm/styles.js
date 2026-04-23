import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  padding: 12px 14px;

  border: none;
  border-radius: 10px;

  font-size: 0.95rem;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s ease;

  background: ${({ disabled, "data-mode": mode }) => {
    if (disabled) return "#94a3b8";

    switch (mode) {
      case "create":
        return "#16a34a";
      case "update":
        return "#2563eb";
      case "delete":
        return "#dc2626";
      default:
        return "#1e293b";
    }
  }};

  color: white;

  &:hover {
    filter: brightness(0.95);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    transform: none;
  }
`;