import { useEffect } from "react";
import {
  Controller,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";
import SelectSalas from "../ui/selectSalas.jsx";
import SelectTurnos from "../ui/selectTurnos.jsx";
import ButtonForm from "../forms/buttonForm/ButtonForm.jsx";
import { updateTurma } from "../../services/turmaService.js";
import * as S from "./turmaUpdateModalStyle.js";

function toUpperLabel(value) {
  return String(value || "-").toUpperCase();
}

export default function TurmaUpdateModal({
  isOpen,
  row,
  onClose,
  onSuccess,
}) {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      id: null,
      name: "",
      turno: null,
      sala_id: null,
    },
  });

  useEffect(() => {
    if (!isOpen || !row) return;

    reset({
      id: row.turma_id || null,
      name: row.turma || "",
      turno: row.turno || null,
      sala_id: row.sala_id ?? null,
    });
  }, [isOpen, reset, row]);

  if (!isOpen || !row) return null;

  async function onSubmit(data) {
    if (!data.id) {
      toast.error(
        "Nao foi possivel identificar a turma selecionada"
      );
      return;
    }

    await updateTurma(data);
    toast.success("Turma atualizada");
    onSuccess?.();
    onClose?.();
  }

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <S.TopBar>
          <S.TitleGroup>
            <h2>Atualizar turma</h2>
            <span>
              Ajuste a sala e o turno sem sair
              da dashboard.
            </span>
          </S.TitleGroup>

          <S.CloseButton
            type="button"
            onClick={onClose}
          >
            x
          </S.CloseButton>
        </S.TopBar>

        <S.InfoGrid>
          <S.InfoCard>
            <span>Turma</span>
            <strong>
              {toUpperLabel(row.turma)}
            </strong>
          </S.InfoCard>

          <S.InfoCard>
            <span>Sala atual</span>
            <strong>
              {toUpperLabel(row.sala)}
            </strong>
          </S.InfoCard>

          <S.InfoCard>
            <span>Turno atual</span>
            <strong>
              {toUpperLabel(row.turno)}
            </strong>
          </S.InfoCard>
        </S.InfoGrid>

        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Field>
            <S.Label>Nome da turma</S.Label>
            <S.Input
              {...register("name")}
              placeholder="Digite o nome da turma"
            />
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
                <SelectSalas {...field} />
              )}
            />
          </S.Field>

          <ButtonForm
            mode="update"
            isLoading={isSubmitting}
          />
        </S.Form>
      </S.Modal>
    </S.Overlay>
  );
}
