import { useNavigate } from 'react-router-dom'

// Style
import * as S from './style'

//Imagens utilizadas na pagina
import logo from '../../assets/logo_senai.svg'

export default function NavBarAdmin() {
  const navigate = useNavigate()

  // Tomada de decisão do usuario para escolher qual lugar navegar.
  const route = (route) => {
    switch (route) {
      case 'salas':
        navigate('/atualizar-salas');
        break;

      case 'turmas':
        navigate('/atualizar-turmas')
        break;

      case 'anucio':
        navigate('/atualizar-anucio')
    }
  }

  const nomeUser = JSON.parse(localStorage.getItem('PainelSenai:DataUser')).username

  return (
    <S.Nav>
      <S.UL>
        <S.LIAtualizacoes onClick={() => route('salas')}>Salas</S.LIAtualizacoes>
        <S.LIAtualizacoes onClick={() => route('turmas')}>Turmas</S.LIAtualizacoes>
        <S.LIAtualizacoes onClick={() => route('anucio')}>Anucios</S.LIAtualizacoes>
      </S.UL>

      <S.LogoWrapper>
        <img src={logo} alt="logo-senai" />
      </S.LogoWrapper>

      <S.UL>
        <S.LINome> <span>Bem vindo (a)</span> <b>{nomeUser}</b></S.LINome>
      </S.UL>
    </S.Nav>
  )
}