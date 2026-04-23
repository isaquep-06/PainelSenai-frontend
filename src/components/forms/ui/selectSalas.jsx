import Select from "react-select";
import { useSalas } from "../../../hooks/useSalasDisponiveis";

export default function SelectSalas({ value, onChange, turno }) {
  const { data, loading } = useSalas(turno);

  const options = [
    {
      value: null,
      label: "SEM SALA",
    },
    ...(data || []).map((sala) => ({
      value: sala.id,
      label: (sala.name || "").trim().toUpperCase(),
    })),
  ];

  if (!turno) return <p>Selecione um turno primeiro</p>;
  if (loading) return <p>Carregando salas...</p>;

  return (
    <Select
      options={options}
      value={options.find((opt) => opt.value === value) || null}
      onChange={(selected) => onChange(selected?.value ?? null)}
      placeholder="Selecione a sala"
    />
  );
}