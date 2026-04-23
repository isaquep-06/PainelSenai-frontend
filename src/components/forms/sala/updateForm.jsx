import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";  
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

// Style
import * as S from '../../../styles/formsStyles/style'

// Schemas
import { updateSchemaSala } from "../../../schemas/salaSchemas";

// Services
import { updateSala } from "../../../services/salaServices";

// Components
import ButtonForm from "../buttonForm/buttonForm";
import SelectSalas from "../ui/selectSalas";

export default function UpdateFormSala() {

  const {
    register, 
    handleSubmit,
    control,
    formState: { isSubmitting, errors }
  } = useForm({
    resolver: yupResolver(updateSchemaSala),
    defaultValues: {
      id: null,
      name: "",
      type: ""
    }
  });

  async function onSubmit(data) {
    try {
      await updateSala(data);
    } catch (err) {
      console.error("Erro ao atualizar sala:", err);
    }
  }

  const optionsType = [
    { value: "laboratorio", label: "Laboratório" },
    { value: "comum", label: "Sala comum" },
    { value: "especial", label: "Especial" }
  ];

  return (
    <S.FormContainer>

      <S.Header>
        <h2>Atualizar sala</h2>
        <span>Edite os dados da sala selecionada</span>
      </S.Header>

      <S.Form onSubmit={handleSubmit(onSubmit)}>

        {/* 🔹 Seleção da sala */}
        <S.Field>
          <S.Label>Sala</S.Label>
          <Controller 
            name='id'
            control={control}
            render={({ field }) => (
              <SelectSalas {...field} />
            )}
          />
          <S.Error>{errors.id?.message}</S.Error>
        </S.Field>

        {/* 🔹 Nome */}
        <S.Field>
          <S.Label>Novo nome</S.Label>
          <S.Input
            type="text"
            placeholder="Ex: LAB 01"
            {...register("name")}
          />
          <S.Error>{errors.name?.message}</S.Error>
        </S.Field>

        {/* 🔹 Tipo */}
        <S.Field>
          <S.Label>Tipo da sala</S.Label>

          <Controller 
            name="type"
            control={control}
            render={({ field }) => (
              <Select 
                options={optionsType}
                isClearable
                placeholder="Selecione o tipo"
                value={optionsType.find(opt => opt.value === field.value) || null}
                onChange={(selected) => field.onChange(selected?.value ?? null)}
              />
            )}
          />

          <S.Error>{errors.type?.message}</S.Error>
        </S.Field>

        {/* 🔹 Botão */}
        <ButtonForm mode="update" isLoading={isSubmitting} />

      </S.Form>
    </S.FormContainer>
  );
}