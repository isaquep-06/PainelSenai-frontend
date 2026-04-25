import Select from "react-select";
import { useSalas } from "../../hooks/useSalasDisponiveis";

export default function SelectSalas({ value, onChange }) {
  const { data, loading } = useSalas();

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

  if (loading) return <p>Carregando salas...</p>;

  return (
    <Select
      options={options}
      value={options.find((opt) => opt.value === value) || null}
      onChange={(selected) => onChange(selected?.value ?? null)}
      placeholder="Selecione a sala"
      isClearable
    />
  );
}