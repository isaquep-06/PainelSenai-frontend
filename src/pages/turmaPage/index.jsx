import { useState } from 'react';

// Forms
import CreateForm from "../../components/forms/turma/createForm";
import UpdateForm from '../../components/forms/turma/updateForm';
import DeleteForm from '../../components/forms/turma/deleteForm';

// NavBar específica para os modos
import NavBarForm from "../../components/navBarForm/navbarForm";

// Estilos -> Styles
import * as S from './style.js';
import { usePageTitle } from '../../styles/pageName.jsx';

export default function TurmaPage() {
  usePageTitle("Atualizar Turmas");
  const [mode, setMode] = useState('create'); // 'create', 'update', 'delete'

  // Renderiza o formulário baseado no modo atual
  const renderForm = () => {
    switch (mode) {
      case 'create':
        return <CreateForm />;
      case 'update':
        return <UpdateForm />;
      case 'delete':
        return <DeleteForm />;
      default:
        return <CreateForm />;
    }
  };

  return (
    <S.PageContainer>
      <NavBarForm
        mode={mode}
        setMode={setMode}
        name='Turma'
      />
      <S.FormArea>
        {renderForm()}
      </S.FormArea>
    </S.PageContainer>
  );
}
