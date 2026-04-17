// React hooks
import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

// Services
import {
  deleteSala,
  getSalasDisponiveis
} from "../../../services/salaServices";

// Função principal
export default function DeleteFormSala() {
  const [salas, setSalas] = useState([]);
  const [selectedSala, setSelectedSala] = useState(null);
  const [loading, setLoading] = useState(false);

  // Carregar salas
  useEffect(() => {
    async function load() {
      try {
        const res = await getSalasDisponiveis();

        const salaFormatada = res.map((t) => ({
          value: t.id,
          label: t.name
        }));

        setSalas(salaFormatada);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar salas");
      }
    }

    load();
  }, []);

  // Delete
  async function handleDelete() {
    if (!selectedSala) {
      toast.warning("Selecione uma sala primeiro!");
      return;
    }

    try {
      setLoading(true);

      await deleteSala(selectedSala.value);

      // Atualiza lista após deletar
      setSalas((prev) =>
        prev.filter((t) => t.value !== selectedSala.value)
      );

      setSelectedSala(null);

      toast.success("Sala deletada com sucesso!");
    } catch (err) {
      console.error("Erro ao deletar:", err);
      toast.error("Erro ao deletar sala");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <label>Selecione uma sala</label>

      <Select
        options={salas}
        value={selectedSala}
        onChange={(opt) => setSelectedSala(opt)}
        placeholder="Selecione uma sala"
        isClearable
        isDisabled={loading}
      />

      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deletando..." : "Deletar"}
      </button>
    </div>
  );
}