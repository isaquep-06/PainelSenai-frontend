import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import TableDashboard from "../../components/dashboard/tableDashboard.jsx";
import { NavBar } from "../../components/navbar/index.jsx";
import Anuncio from "../../components/anucios/index.jsx";

import VideoSenai1 from '../../assets/video-unidade-senai.mp4';
import VideoSenai2 from '../../assets/video-senai-2.mp4';

import Anucio1 from '../../assets/anucio1.webp';
import Anucio2 from '../../assets/anucio2.png';
import Anucio3 from '../../assets/anucio3.png';
import Anucio4 from '../../assets/anucio4.png';
import Anucio5 from '../../assets/anucio5.png';
import Anucio6 from '../../assets/anucio6.png';

import * as S from './style.js';
import QR from "../../components/qrcoce/index.jsx";

function Dashboard() {
  const [turno, setTurno] = useState("matutino");
  const [data, setData] = useState([]);
  const [indexMidia, setIndexMidia] = useState(0);

  const midias = [
    { type: "image", src: Anucio1, duration: 120000 },
    { type: "image", src: Anucio2, duration: 120000 },
    { type: "video", src: VideoSenai1 },
    { type: "image", src: Anucio3, duration: 120000 },
    { type: "video", src: VideoSenai2 },
    { type: "image", src: Anucio4, duration: 120000 },
    { type: "image", src: Anucio5, duration: 120000 },
    { type: "image", src: Anucio6, duration: 120000 },
  ];

  function nextMidia() {
    setIndexMidia((prev) => (prev + 1) % midias.length);
  }

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/dashboard?turno=${turno}`);
        setData(res.data || []);
        toast.success("Tabela carregada ✔", { autoClose: 2000 });
      } catch {
        toast.error("Erro ao carregar ⛔");
        setData([]);
      }
    }
    load();
  }, [turno]);

  //  DIVISÃO INTELIGENTE DAS TABELAS
  const metade = Math.ceil(data.length / 2);

  const tabelaEsquerda = data.slice(0, metade);
  const tabelaDireita = data.slice(metade);

  return (
    <S.Body>
      <NavBar setTurno={setTurno} turno={turno} />

      <S.MainContent>

        {/*  TABELAS LADO A LADO */}
        <S.TablesContainer style={{ display: "flex", gap: "16px" }}>

          {/* ESQUERDA (prioriza se ímpar) */}
          <TableDashboard data={tabelaEsquerda} />

          {/* DIREITA */}
          <TableDashboard data={tabelaDireita} />

        </S.TablesContainer>

        {/*  LADO DIREITO */}
        <S.RightSide>

          <S.VideoContainer>
            <Anuncio
              midia={midias[indexMidia]}
              onNext={nextMidia}
            />
          </S.VideoContainer>

          <QR />

        </S.RightSide>

      </S.MainContent>
    </S.Body>
  );
}

export default Dashboard;