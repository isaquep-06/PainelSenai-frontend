import { useEffect, useState } from "react";

// Services
import { getSalas } from "../../services/salaServices";
import { getTurma } from "../../services/turmaService";


// Style
import * as S from "./style";
import NavBarAdmin from "../../components/navbarAdmin";
import { getUploads } from "../../services/uploadService";
import { toast } from "react-toastify";

export default function DashboardAdmin() {
  const [salas, setSalas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [uploads, setUploads] = useState([])

  useEffect(() => {
    async function loadData() {
      try {
        const [salasData, turmasData] = await Promise.all([
          getSalas(),
          getTurma(),
        ]);

        setSalas(salasData);
        setTurmas(turmasData);
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      }
    }

    loadData();
  }, []);

  // Carregar total de uploads feitos
  useEffect(() => {
    const load = async () => {
      try {
        const uploads = await getUploads()
        setUploads(uploads.length)
      } catch (err) {
        toast.error('Erro ao carregar total de anucios')
      }
    }

    load();
  }, []);

  // 🔹 métricas
  const totalSalas = salas.length;
  const totalTurmas = turmas.length;

  const salasComum = salas.filter((s) => s.type === "comum").length;
  const salasLab = salas.filter((s) => s.type === "laboratorio").length;
  const salasEspecial = salas.filter((s) => s.type === "especial").length;

  const turmasMatutino = turmas.filter((t) => t.turno === "matutino").length;
  const turmasVespertino = turmas.filter((t) => t.turno === "vespertino").length;
  const turmasNoturno = turmas.filter((t) => t.turno === "noturno").length;

  return (
    <>
      <NavBarAdmin />
      <S.Container>
        <S.Header>
          <h1>Dashboard Administrativo</h1>
          <p>Visão geral do sistema</p>
        </S.Header>

        <S.Grid>
          <S.Card>
            <h2>Total de Salas</h2>
            <strong>{totalSalas}</strong>
          </S.Card>

          <S.Card>
            <h2>Total de Turmas</h2>
            <strong>{totalTurmas}</strong>
          </S.Card>

          <S.Card>
            <h2>Salas Comuns</h2>
            <strong>{salasComum}</strong>
          </S.Card>

          <S.Card>
            <h2>Laboratórios</h2>
            <strong>{salasLab}</strong>
          </S.Card>

          <S.Card>
            <h2>Salas Especiais</h2>
            <strong>{salasEspecial}</strong>
          </S.Card>

          <S.Card>
            <h2>Turmas Matutino</h2>
            <strong>{turmasMatutino}</strong>
          </S.Card>

          <S.Card>
            <h2>Turmas Vespertino</h2>
            <strong>{turmasVespertino}</strong>
          </S.Card>

          <S.Card>
            <h2>Turmas Noturno</h2>
            <strong>{turmasNoturno}</strong>
          </S.Card>

          <S.Card>
            <h2>Total de anucios</h2>
            <strong>{uploads}</strong>
          </S.Card>
        </S.Grid>
      </S.Container>
    </>

  );
}