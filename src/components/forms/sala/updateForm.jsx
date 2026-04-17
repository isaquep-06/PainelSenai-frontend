import { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";

// Components
import SelectSalas from "../ui/selectSalas";
import SelectTurnos from "../ui/selectTurnos";
import ButtonForm from "../buttonForm/buttonForm";

// Schema
import { updateSchema } from "../../../schemas/turmaSchema";

// Service
import { updateTurma, getTurma } from "../../../services/turmaService";

export default function UpdateForm() {
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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

  // 🔹 Carregar turmas
  useEffect(() => {
    async function load() {
      try {
        const res = await getTurma();
        const data = res || [];

        const turmasAjustadas = data.map((t) => ({
          value: t.id,
          label: t.name || "Sem nome",
          ...t,
        }));

        setTurmas(turmasAjustadas);
      } catch (error) {
        console.error("Erro ao carregar turmas:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // 🔹 Observar turma selecionada
  const selectedId = useWatch({
    control,
    name: "id",
  });

  // 🔹 Preencher formulário
  useEffect(() => {
    if (!selectedId) return;

    const turmaSelecionada = turmas.find((t) => t.value === selectedId);

    if (turmaSelecionada) {
      setValue("name", turmaSelecionada.name || "");
      setValue("turno", turmaSelecionada.turno || null);
      setValue("sala_id", turmaSelecionada.sala_id || null);

      setIsInitialLoad(true);
      setTimeout(() => setIsInitialLoad(false), 0); // evita reset imediato
    }
  }, [selectedId, turmas, setValue]);

  // 🔹 Observar turno e sala
  const turno = useWatch({ control, name: "turno" });
  const sala_id = useWatch({ control, name: "sala_id" });

  // 🔹 Validar sala ao mudar turno
  useEffect(() => {
    if (isInitialLoad) return;
    if (!turno || !sala_id) return;

    // Aqui você poderia validar via API se quiser
    // Por enquanto só garante reset seguro
    setValue("sala_id", null);
  }, [turno]);

  // 🔹 Submit
  async function onSubmit(data) {
    try {
      await updateTurma(data);
      alert("Turma atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar turma");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loading && <p>Carregando turmas...</p>}

      {!loading && (
        <Controller
          name="id"
          control={control}
          render={({ field }) => (
            <Select
              options={turmas}
              placeholder="Selecione a turma"
              isClearable
              value={
                turmas.find((opt) => opt.value === field.value) || null
              }
              onChange={(selected) =>
                field.onChange(selected?.value || null)
              }
            />
          )}
        />
      )}

      {/* Nome */}
      <input
        type="text"
        placeholder="Nome da turma"
        {...register("name")}
      />

      {/* Turno */}
      <Controller
        name="turno"
        control={control}
        render={({ field }) => (
          <SelectTurnos
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      {/* Sala */}
      <Controller
        name="sala_id"
        control={control}
        render={({ field }) => (
          <SelectSalas
            value={field.value}
            onChange={field.onChange}
            turno={turno}
          />
        )}
      />

      <ButtonForm mode="update" isLoading={isSubmitting} />
    </form>
  );
}