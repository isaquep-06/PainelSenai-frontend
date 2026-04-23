import * as S from "./styles";

export default function ButtonForm({ mode, isLoading }) {
  return (
    <S.Button type="submit" disabled={isLoading} data-mode={mode}>
      {isLoading ? "Processando..." : "Confirmar"}
    </S.Button>
  );
}