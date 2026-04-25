import { usePageTitle } from "../../styles/pageName.jsx";
import { useNavigate } from "react-router-dom";
import * as S from "./style.js";

function PageError() {
  const navigate = useNavigate();

  usePageTitle("Pagina nao encontrada");

  return (
    <S.PageContainer>
      <S.Content>
        <S.Code>Erro 404</S.Code>
        <S.Title>Pagina nao encontrada</S.Title>
        <S.Description>
          O endereco acessado nao existe ou nao esta mais disponivel. Voce pode
          voltar para o painel principal e continuar a navegacao por la.
        </S.Description>

        <S.Actions>
          <S.DashboardButton onClick={() => navigate("/dashboard")}>
            Ir para o dashboard
          </S.DashboardButton>
        </S.Actions>
      </S.Content>
    </S.PageContainer>
  );
}

export default PageError;
