import { useNavigate } from 'react-router-dom';
import * as S from './style.js';

// Images
import adicionarImg from '../../assets/plus.png';
import atualizarImg from '../../assets/loading-arrow.png';
import deleteImg from '../../assets/delete.png';
import logo from '../../assets/logo_senai.svg';
import imgVoltar from '../../assets/de-volta.png';

export default function NavBarForm({ mode, setMode, name }) {
  const navigate = useNavigate();

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const voltarPage = () => {
    navigate('/dashboardAdmin');
  };

  const irParaTV = () => {
    navigate('/dashboard');
  };

  return (
    <S.Nav>

      {/* 🔹 ESQUERDA */}
      <S.NavLeft>
        <img
          style={{ width: '32px', cursor: 'pointer' }}
          src={imgVoltar}
          onClick={voltarPage}
          alt="voltar"
        />
      </S.NavLeft>

      {/* 🔹 CENTRO */}
      <S.NavCenter>
        <S.NavItem
          active={mode === 'create'}
          onClick={() => handleModeChange('create')}
        >
          Criar {name}
          <img src={adicionarImg} alt="" />
        </S.NavItem>

        <S.NavItem
          active={mode === 'update'}
          onClick={() => handleModeChange('update')}
        >
          Atualizar {name}
          <img src={atualizarImg} alt="" />
        </S.NavItem>

        <S.NavItem
          active={mode === 'delete'}
          onClick={() => handleModeChange('delete')}
        >
          Remover {name}
          <img src={deleteImg} alt="" />
        </S.NavItem>
      </S.NavCenter>

      {/* 🔹 DIREITA */}
      <S.NavRight>
        <S.TVButton onClick={irParaTV} title="Ver na TV">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
            <polyline points="17 2 12 7 7 2"></polyline>
          </svg>
        </S.TVButton>
        <img style={{ width: '180px' }} src={logo} alt="logo_senai" />
      </S.NavRight>

    </S.Nav>
  );
}