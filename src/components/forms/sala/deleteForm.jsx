import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

// Style
import * as S from '../../../styles/formsStyles/style'

// Services
import {
  deleteSala,
  getSalas
} from "../../../services/salaServices";

// Components
import ButtonForm from "../buttonForm/buttonForm";

export default function DeleteFormSala() {
  const [salas, setSalas] = useState([]);
  const [selectedSala, setSelectedSala] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await getSalas();

        setSalas(
          res.map((s) => ({
            value: s.id,
            label: s.name
          }))
        );
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar salas");
      }
    }

    load();
  }, []);

  async function handleDelete() {
    if (!selectedSala) {
      toast.warning("Selecione uma sala!");
      return;
    }

    try {
      setLoading(true);

      await deleteSala(selectedSala.value);

      setSalas(prev =>
        prev.filter(s => s.value !== selectedSala.value)
      );

      setSelectedSala(null);

      toast.success("Sala deletada!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao deletar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <S.FormContainer>

      <S.Header>
        <h2>Remover sala</h2>
        <span>Exclua uma sala do sistema</span>
      </S.Header>

      <S.Form>

        <S.Field>
          <S.Label>Selecione a sala</S.Label>

          <Select
            options={salas}
            value={selectedSala}
            onChange={setSelectedSala}
            placeholder="Selecione uma sala"
            isClearable
            isDisabled={loading}
          />
        </S.Field>

        <ButtonForm
          mode="delete"
          isLoading={loading}
          onClick={handleDelete}
        />

      </S.Form>
    </S.FormContainer>
  );
}