import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";

// Style
import * as S from '../../../styles/formsStyles/create/style'

// Components
import SelectTurnos from "../ui/selectTurnos";
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
      type: "",
      turno: ""
    }
  });

  // Observa o turno 
  const turno = useWatch({
    control,
    name: "turno"
  });

  async function onSubmit(data) {
    try {
      await createSala(data);
      console.log("Sala criada com sucesso:", data);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Nome da sala */}
      <label>Digite o nome da sala</label>
      <input
        type="text"
        placeholder="ex: LAB 1"
        {...register("name")}
      />
      <span>{errors.name?.message}</span>

      {/* Tipo da sala */}
      <label>Tipo da sala</label>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select
            options={options}
            isClearable
            value={options.find(opt => opt.value === field.value) || null}
            onChange={(selected) =>
              field.onChange(selected ? selected.value : "")
            }
          />
        )}
      />
      <span>{errors.type?.message}</span>

      {/* Turno */}
      <label>Turno</label>
      <Controller
        name="turno"
        control={control}
        render={({ field }) => (
          <SelectTurnos {...field} turno={turno} />
        )}
      />
      <span>{errors.turno?.message}</span>

      {/* Botão */}
      <ButtonForm
        mode="create"
        isLoading={isSubmitting}
      />
    </form>
  );
}