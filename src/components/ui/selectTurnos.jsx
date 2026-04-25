import Select from "react-select";

export default function SelectTurnos({ value, onChange }) {

  const options = [
    { value: 'matutino', label: 'Matutino' },
    { value: 'vespertino', label: 'Vespertino' },
    { value: 'noturno', label: 'Noturno' },
  ];

  return (
    <Select
      options={options}
      isClearable
      placeholder="Selecione uma opção..."
      value={options.find(opt => opt.value === value) || null}
      onChange={(selected) => onChange(selected?.value || null)}
    />
  );
}