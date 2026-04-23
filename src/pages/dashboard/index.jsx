// websocket
import { io } from "socket.io-client";

// React hooks
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

// Style
import * as S from './style.js';

// Components
import TableDashboard from "../../components/dashboard/tableDashboard.jsx";
import { NavBar } from "../../components/navbar/index.jsx";
import Anuncio from "../../components/anucios/index.jsx";
import { Sidebar } from "../../components/Sidebar/index.jsx";
import QRCode from "../../components/qrcoce/index.jsx";

// Services -> API
import api from "../../services/api";

// Videos e Imagens
import VideoSenai1 from '../../assets/video-unidade-senai.mp4';
import VideoSenai2 from '../../assets/video-senai-2.mp4';
import Anucio1 from '../../assets/anucio1.webp';
import Anucio2 from '../../assets/anucio2.png';
import Anucio3 from '../../assets/anucio3.png';
import Anucio4 from '../../assets/anucio4.png';
import Anucio5 from '../../assets/anucio5.png';
import Anucio6 from '../../assets/anucio6.png';

function Dashboard() {
  const [socket, setSocket] = useState(null);

  function getTurnoAtual() {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) return "matutino";
    if (hora >= 12 && hora < 18) return "vespertino";
    return "noturno";
  }

  const [turno, setTurno] = useState(getTurnoAtual());
  const [data, setData] = useState([]);
  const [indexMidia, setIndexMidia] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

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
    const interval = setInterval(() => {
      const novoTurno = getTurnoAtual();
      setTurno((prev) => (prev !== novoTurno ? novoTurno : prev));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = useCallback(async (showToast = false, timestamp = null) => {
    try {
      const res = await api.get(`/dashboard?turno=${turno}`);
      setData(res.data || []);

      if (timestamp) {
        setLastUpdate(new Date(timestamp));
      } else {
        setLastUpdate(new Date()); // fallback (refresh manual)
      }

      if (showToast) {
        toast.success("Atualizado");
      }

      return true;
    } catch {
      if (showToast) {
        toast.error("Erro ao carregar");
      }
      setData([]);
      return false;
    }
  }, [turno]);

  useEffect(() => {
    loadDashboardData();
  }, [turno, loadDashboardData]);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");

    newSocket.on("connect", () => {
      console.log("connected");
    });

    newSocket.on("disconnect", () => {
      console.log("disconnected");
    });

    newSocket.on("reconnect", () => {
      loadDashboardData(false, event?.timestamp);
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [loadDashboardData]);

  useEffect(() => {
    if (!socket) return;

    let timeout;

    const handler = (event) => {
      if (!event?.turno || event.turno === turno) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
          loadDashboardData(false, event?.timestamp);
        }, 300);
      }
    };
    socket.on("dashboard:update", handler);

    return () => {
      socket.off("dashboard:update", handler);
    };
  }, [socket, turno, loadDashboardData]);

  const metade = Math.ceil(data.length / 2);
  const tabelaEsquerda = data.slice(0, metade);
  const tabelaDireita = data.slice(metade);

  return (
    <S.Body>
      <NavBar
        setTurno={setTurno}
        turno={turno}
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />

      <S.MainContent>
        <S.TablesContainer style={{ display: "flex", gap: "16px" }}>
          <TableDashboard data={tabelaEsquerda} />
          <TableDashboard data={tabelaDireita} />
        </S.TablesContainer>

        <S.RightSide>
          <S.VideoContainer>
            <Anuncio midia={midias[indexMidia]} onNext={nextMidia} />
          </S.VideoContainer>
        </S.RightSide>
      </S.MainContent>

      <QRCode />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        lastUpdate={lastUpdate}
        onRefresh={() => loadDashboardData(true)}
      />
    </S.Body>
  );
}

export default Dashboard;