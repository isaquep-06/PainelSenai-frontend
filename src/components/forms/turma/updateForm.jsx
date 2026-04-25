import { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import { toast } from "react-toastify";

import { updateSchema } from "../../../schemas/turmaSchema";
import { updateTurma, getTurma } from "../../../services/turmaService";

import SelectSalas from "../../ui/selectSalas";
import SelectTurnos from "../../ui/selectTurnos";

import * as S from "../../../styles/formsStyles/style";
import ButtonForm from "../buttonForm/ButtonForm";

export default function UpdateForm() {
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      id: null,
      name: "",
      turno: null,
      sala_id: null,
    },
    resolver: yupResolver(updateSchema),
  });

  useEffect(() => {
    async function load() {
      const res = await getTurma();

      setTurmas(
        res.map((t) => ({
          value: t.id,
          label: t.name,
          ...t,
        }))
      );

      setLoading(false);
    }

    load();
  }, []);

  const selectedId = useWatch({ control, name: "id" });
  const turno = useWatch({ control, name: "turno" });

  useEffect(() => {
    if (!selectedId) return;

    const turma = turmas.find((t) => t.value === selectedId);

    if (turma) {
      setValue("name", turma.name);
      setValue("turno", turma.turno);
      setValue("sala_id", turma.sala_id);
    }
  }, [selectedId]);

  useEffect(() => {
    setValue("sala_id", null);
  }, [turno]);

  async function onSubmit(data) {
    await updateTurma(data);
    toast.success("Turma atualizada");
  }

  return (
    <S.FormContainer>
      <S.Header>
        <h2>Atualizar turma</h2>
        <span>Edite os dados da turma selecionada</span>
      </S.Header>

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        {!loading && (
          <S.Field>
            <S.Label>Turma</S.Label>

            <Controller
              name="id"
              control={control}
              render={({ field }) => (
                <Select
                  options={turmas}
                  value={turmas.find((t) => t.value === field.value) || null}
                  onChange={(opt) => field.onChange(opt?.value || null)}
                />
              )}
            />
          </S.Field>
        )}

        <S.Field>
          <S.Label>Nome</S.Label>
          <S.Input {...register("name")} />
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

        <ButtonForm
          mode="update"
          isLoading={isSubmitting}
        />
      </S.Form>
    </S.FormContainer>
  );
}