import Select from "react-select";
import { useSalasDisponiveis } from "../../../hooks/useSalasDisponiveis";

export default function SelectSalas({ value, onChange, turno }) {
  const { data, loading } = useSalasDisponiveis(turno);

  const options = (data || []).map(t => ({
    value: t.id,
    label: t.name
  }));

  if (loading) {
    return <p>Carregando salas...</p>;
  }

  return (
    <Select
      options={options}
      placeholder='Selecione a sala'
      isClearable
      value={options.find(opt => opt.value === value) || null}
      onChange={(selected) => onChange(selected?.value || null)}
    />
  );
}