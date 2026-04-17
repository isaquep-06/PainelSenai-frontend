import { useEffect, useState } from "react";
import { deleteTurma, getTurma } from "../../../services/turmaService";
import Select from "react-select";
import { toast } from "react-toastify";

export default function DeleteForm() {
  const [turmas, setTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState(null);

  // 🔹 Carregar turmas
  useEffect(() => {
    async function load() {
      const res = await getTurma();

      const turmaFormatada = res.map((t) => ({
        value: t.id,
        label: t.name,
      }));

      setTurmas(turmaFormatada);
    }

    load();
  }, []);

  // 🔹 Delete
  async function handleDelete() {
    if (!selectedTurma) {
      toast.warning("Selecione uma turma primeiro!");
      return;
    }

    try {
      await deleteTurma(selectedTurma.value);

      // Atualiza lista após deletar
      setTurmas((prev) =>
        prev.filter((t) => t.value !== selectedTurma.value)
      );

      setSelectedTurma(null);
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar");
    }
  }

  return (
    <div>
      <Select
        options={turmas}
        value={selectedTurma}
        onChange={(option) => setSelectedTurma(option)}
        placeholder="Selecione a turma"
        isClearable
      />

      <button onClick={handleDelete}>
        Deletar
      </button>
    </div>
  );
}