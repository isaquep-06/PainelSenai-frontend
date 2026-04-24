import { io } from "socket.io-client";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import * as S from "./style.js";

import TableDashboard from "../../components/dashboard/tableDashboard.jsx";
import { NavBar } from "../../components/navbar/index.jsx";
import Anuncio from "../../components/anucios/index.jsx";
import { Sidebar } from "../../components/Sidebar/index.jsx";
import QRCode from "../../components/qrcoce/index.jsx";

import api from "../../services/api";

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

  const [midias, setMidias] = useState([]);
  const [indexMidia, setIndexMidia] = useState(0);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  function nextMidia() {
    if (midias.length === 0) return;

    setIndexMidia((prev) => (prev + 1) % midias.length);
  }

  async function loadMidias() {
    try {
      const res = await api.get("/upload");

      const somenteAtivos = (res.data || []).filter(
        (item) => item.active === true
      );

      setMidias(somenteAtivos);
      setIndexMidia(0);
    } catch (error) {
      console.error("Erro ao carregar mídias:", error);
    }
  }

  useEffect(() => {
    loadMidias();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const novoTurno = getTurnoAtual();

      setTurno((prev) =>
        prev !== novoTurno ? novoTurno : prev
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = useCallback(
    async (showToast = false, timestamp = null) => {
      try {
        const res = await api.get(
          `/dashboard?turno=${turno}`
        );

        setData(res.data || []);

        if (timestamp) {
          setLastUpdate(new Date(timestamp));
        } else {
          setLastUpdate(new Date());
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
    },
    [turno]
  );

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
      loadDashboardData(false);
      loadMidias();
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
          loadDashboardData(
            false,
            event?.timestamp
          );
        }, 300);
      }
    };

    socket.on("dashboard:update", handler);

    socket.on("anuncios:update", loadMidias);

    return () => {
      socket.off("dashboard:update", handler);
      socket.off("anuncios:update", loadMidias);
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
        onOpenSidebar={() =>
          setIsSidebarOpen(true)
        }
      />

      <S.MainContent>
        <S.TablesContainer
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          <TableDashboard
            data={tabelaEsquerda}
          />

          <TableDashboard
            data={tabelaDireita}
          />
        </S.TablesContainer>

        <S.RightSide>
          <S.VideoContainer>
            {midias.length > 0 ? (
              <Anuncio
                midia={midias[indexMidia]}
                onNext={nextMidia}
              />
            ) : (
              <span>
                Nenhum anúncio ativo
              </span>
            )}
          </S.VideoContainer>
        </S.RightSide>
      </S.MainContent>

      <QRCode />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() =>
          setIsSidebarOpen(false)
        }
        lastUpdate={lastUpdate}
        onRefresh={() =>
          loadDashboardData(true)
        }
      />
    </S.Body>
  );
}

export default Dashboard;