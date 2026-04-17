import Select from "react-select";
import { useSalasDisponiveis } from "../../../hooks/useSalasDisponiveis";

export default function SelectSalas({ value, onChange, turno }) {
  const { data, loading } = useSalasDisponiveis(turno);

  const options = (data || []).map((sala) => ({
    value: sala.id,
    label: sala.ocupada
      ? `${(sala.name || "").trim().toUpperCase()} (Ocupada)`
      : (sala.name || "").trim().toUpperCase(),
    isDisabled: sala.ocupada
  }));

  if (!turno) return <p>Selecione um turno primeiro</p>;
  if (loading) return <p>Carregando salas...</p>;

  return (
    <Select
      options={options}
      value={options.find((opt) => opt.value === value) || null}
      onChange={(selected) => onChange(selected?.value || null)}
      placeholder="Selecione a sala"
      isClearable
    />
  );
}