// React hook
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { useWatch } from "react-hook-form";

// Components
import NavBarForm from "../../navBarForm/navbarForm";
import SelectSalas from "../../ui/selectSalas";
import SelectTurnos from "../../ui/selectTurnos";
import ButtonForm from "../buttonForm/ButtonForm";

// Styles
import * as S from "../../../styles/formsStyles/style";

// Schemas
import { createSchema } from '../../../schemas/turmaSchema'

// Services
import { createTurma } from "../../../services/turmaService";




export default function CreateForm() {
  // Estado que controla o mode
  const [mode, setMode] = useState('create')



  // useForm -> Enviar dados
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm({
    resolver: yupResolver(createSchema),
  });

  const turno = useWatch({
    control,
    name: "turno"
  });

  async function onSubmit(data) {
    await createTurma(data);
  }

  return (
    <>
      <S.FormContainer>
        <S.Header>
          <h2>Criar Turma</h2>
          <span>Preencha os dados da turma</span>
        </S.Header>

        <S.Form onSubmit={handleSubmit(onSubmit)}>

          <S.Field>
            <S.Label>Nome da turma</S.Label>
            <S.Input {...register('name')} placeholder="Ex: 2º DS" />
          </S.Field>

          <S.Field>
            <S.Label>Turno</S.Label>
            <Controller
              name="turno"
              control={control}
              render={({ field }) => (
                <SelectTurnos {...field} />
              )}
            />
          </S.Field>

          <S.Field>
            <S.Label>Sala</S.Label>
            <Controller
              name="sala_id"
              control={control}
              render={({ field }) => (
                <SelectSalas {...field} turno={turno} />
              )}
            />
          </S.Field>

          <ButtonForm mode={mode} isLoading={isSubmitting} />

        </S.Form>
      </S.FormContainer>
    </>

  )
}