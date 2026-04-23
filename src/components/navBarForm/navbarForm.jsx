import * as S from './style.js';


// Images
import adicionarImg from '../../assets/plus.png'
import atualizarImg from '../../assets/loading-arrow.png'
import deleteImg from '../../assets/delete.png'
import logo from '../../assets/logo_senai.svg'

export default function NavBarForm({ mode, setMode, name }) {

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const modeLabels = {
    create: `Criar ${name}`,
    update: `Editar ${name}`,
    delete: `Remover ${name}`,
  };

  return (
    <S.Nav>
      <S.NavList>
        <S.NavItem
          active={mode === 'create'}
          onClick={() => handleModeChange('create')}
        >
          {`Criar ${name}`}
          <img src={adicionarImg} alt="" />

        </S.NavItem>
        <S.NavItem
          active={mode === 'update'}
          onClick={() => handleModeChange('update')}
        >
          {`Atualizar ${name}`}
          <img src={atualizarImg} alt="" />

        </S.NavItem>
        <S.NavItem
          active={mode === 'delete'}
          onClick={() => handleModeChange('delete')}
        >
          {`Remover ${name}`}
          <img src={deleteImg} alt="" />

        </S.NavItem>


        <img style={{ width: '220px', marginLeft: '250px' }} src={logo} alt="logo_senai" />

      </S.NavList>
      <S.ModeIndicator>
        Modo atual: <strong>{modeLabels[mode]}</strong>
      </S.ModeIndicator>
    </S.Nav>
  );
}