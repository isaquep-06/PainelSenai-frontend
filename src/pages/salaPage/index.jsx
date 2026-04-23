// React hooks
import { useEffect, useState } from "react";

// NavBar especifica para os modos -> CREATE | UPDATE | DELETE
import NavBarForm from "../../components/navBarForm/navbarForm";

// Formularios para cada modo -> CREATE | UPDATE | DELETE
import CreateFormSala from "../../components/forms/sala/createForm";
import UpdateFormSala from "../../components/forms/sala/updateForm";
import DeleteFormSala from "../../components/forms/sala/deleteForm";

// Styles
import * as S from "./style";

export default function SalaPage() {
    const [mode, setMode] = useState('create') // CREATE | UPDATE | DELETE

    const renderForm = () => {
        switch (mode) {
            case 'create':
                return <CreateFormSala />
            case 'update':
                return <UpdateFormSala />
            case 'delete':
                return <DeleteFormSala />
            default: // Padrão para evitar erros, caso o modo seja inválido
                return <CreateFormSala />
        }
    };

    return (
        <S.PageContainer>
            <NavBarForm
                mode={mode}
                setMode={setMode}
                name='Sala'
            />
            <S.FormArea>
                {renderForm()}
            </S.FormArea>
        </S.PageContainer>
    )
}