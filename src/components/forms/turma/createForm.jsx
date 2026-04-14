// React hook
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { useWatch } from "react-hook-form";

// Components
import NavBarForm from "../../navBarForm/navbarForm";
import SelectSalas from "../ui/selectSalas";
import SelectTurnos from "../ui/selectTurnos";
import ButtonForm from "../buttonForm/buttonForm";

// Schemas
import { createSchema } from '../../../schemas/turmaSchema'

// Services
import { createTurma } from "../../../services/turmaService";

// Notificação toast
import { toast } from "react-toastify";



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
      <form onSubmit={handleSubmit(onSubmit)}>

        <input {...register('name')} />

        <Controller
          name="turno"
          control={control}
          render={({ field }) => (
            <SelectTurnos {...field} />
          )}
        />

        <Controller
          name="sala_id"
          control={control}
          render={({ field }) => (
            <SelectSalas {...field} turno={turno} />
          )}
        />

        <ButtonForm
          mode={mode}
          isLoading={isSubmitting}
        />

      </form>
    </>

  )
}