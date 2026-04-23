import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

import { deleteTurma, getTurma } from "../../../services/turmaService";

import * as S from "../../../styles/formsStyles/style";


export default function DeleteForm() {
  const [turmas, setTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await getTurma();

      const formatted = res.map((t) => ({
        value: t.id,
        label: t.name,
      }));

      setTurmas(formatted);
    }

    load();
  }, []);

  async function handleDelete() {
    if (!selectedTurma) {
      toast.warning("Selecione uma turma");
      return;
    }

    await deleteTurma(selectedTurma.value);

    setTurmas((prev) =>
      prev.filter((t) => t.value !== selectedTurma.value)
    );

    setSelectedTurma(null);
    toast.success("Turma removida");
  }

  return (
    <S.FormContainer>
      <S.Header>
        <h2>Remover turma</h2>
        <span>Selecione e confirme a exclusão</span>
      </S.Header>

      <S.Form>
        <S.Field>
          <S.Label>Turma</S.Label>

          <Select
            options={turmas}
            value={selectedTurma}
            onChange={setSelectedTurma}
            placeholder="Selecionar turma"
            isClearable
          />
        </S.Field>

        <button
          type="button"
          onClick={handleDelete}
          style={{
            background: "#dc2626",
            color: "white",
            padding: "12px",
            borderRadius: "10px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
            fontSize: "0.95rem",
          }}
        >
          Excluir turma
        </button>
      </S.Form>
    </S.FormContainer>
  );
}