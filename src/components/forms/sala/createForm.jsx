import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";

// Style
import * as S from '../../../styles/formsStyles/style'

// Components
import ButtonForm from "../buttonForm/buttonForm";

// Schemas
import { createSchemaSala } from "../../../schemas/salaSchemas";

// Services
import { createSala } from "../../../services/salaServices";

export default function CreateFormSala() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(createSchemaSala),
    defaultValues: {
      name: "",
      type: null
    }
  });

  async function onSubmit(data) {
    try {
      await createSala(data);
      console.log("Sala criada:", data);
    } catch (error) {
      console.error("Erro ao criar sala:", error);
    }
  }

  const options = [
    { value: "laboratorio", label: "Laboratório" },
    { value: "comum", label: "Sala comum" },
    { value: "especial", label: "Especial" }
  ];

  return (
    <S.FormContainer>

      <S.Header>
        <h2>Criar sala</h2>
        <span>Cadastre uma nova sala no sistema</span>
      </S.Header>

      <S.Form onSubmit={handleSubmit(onSubmit)}>

        {/* Nome */}
        <S.Field>
          <S.Label>Nome da sala</S.Label>
          <S.Input
            type="text"
            placeholder="Ex: LAB 01"
            {...register("name")}
          />
          <S.Error>{errors.name?.message}</S.Error>
        </S.Field>

        {/* Tipo */}
        <S.Field>
          <S.Label>Tipo da sala</S.Label>

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                options={options}
                placeholder="Selecione o tipo"
                isClearable
                value={options.find(opt => opt.value === field.value) || null}
                onChange={(selected) =>
                  field.onChange(selected?.value ?? null)
                }
              />
            )}
          />

          <S.Error>{errors.type?.message}</S.Error>
        </S.Field>

        <ButtonForm
          mode="create"
          isLoading={isSubmitting}
        />

      </S.Form>
    </S.FormContainer>
  );
}