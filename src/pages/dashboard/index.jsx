import { io } from "socket.io-client";
import {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { toast } from "react-toastify";
import * as S from "./style.js";

import TableDashboard from "../../components/dashboard/tableDashboard.jsx";
import { NavBar } from "../../components/navbar/index.jsx";
import Anuncio from "../../components/Anuncio/index.jsx";
import { Sidebar } from "../../components/Sidebar/index.jsx";
import QRCode from "../../components/qrcode/index.jsx";

import api from "../../services/api";
import { usePageTitle } from "../../styles/pageName.jsx";

const socketUrl = import.meta.env.VITE_API_URL;

function Dashboard() {
  usePageTitle("Dashboard");

  const [socket, setSocket] = useState(null);

  function getTurnoAtual() {
    const hora = new Date().getHours();

    if (hora >= 6 && hora < 12) return "matutino";
    if (hora >= 12 && hora < 18) return "vespertino";

    return "noturno";
  }

  const [turno, setTurno] = useState(getTurnoAtual());
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [midias, setMidias] = useState([]);
  const [indexMidia, setIndexMidia] = useState(0);

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const [lastUpdate, setLastUpdate] =
    useState(null);

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  );

  // =========================
  // RESPONSIVO
  // =========================
  useEffect(() => {
    const resize = () =>
      setIsMobile(window.innerWidth <= 768);

    window.addEventListener("resize", resize);

    return () =>
      window.removeEventListener("resize", resize);
  }, []);

  // =========================
  // MÍDIAS
  // =========================
  function nextMidia() {
    if (midias.length === 0) return;

    setIndexMidia(
      (prev) => (prev + 1) % midias.length
    );
  }

  async function loadMidias() {
    try {
      const res = await api.get("/upload");

      const ativos = (res.data || []).filter(
        (item) => item.active === true
      );

      setMidias(ativos);
      setIndexMidia(0);
    } catch (error) {
      console.error(
        "Erro ao carregar mídias:",
        error
      );
    }
  }

  useEffect(() => {
    loadMidias();
  }, []);

  // =========================
  // TURNO AUTOMÁTICO
  // =========================
  useEffect(() => {
    const interval = setInterval(() => {
      const novoTurno = getTurnoAtual();

      setTurno((prev) =>
        prev !== novoTurno
          ? novoTurno
          : prev
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // DASHBOARD
  // =========================
  const loadDashboardData = useCallback(
    async (
      showToast = false,
      timestamp = null
    ) => {
      try {
        const res = await api.get(
          `/dashboard?turno=${turno}`
        );

        setData(res.data || []);

        setLastUpdate(
          timestamp
            ? new Date(timestamp)
            : new Date()
        );

        if (showToast) {
          toast.success("Atualizado");
        }

        return true;
      } catch {
        setData([]);

        if (showToast) {
          toast.error("Erro ao carregar");
        }

        return false;
      }
    },
    [turno]
  );

  useEffect(() => {
    loadDashboardData();
  }, [turno, loadDashboardData]);

  // =========================
  // SOCKET
  // =========================
  useEffect(() => {
    const newSocket = io(socketUrl);

    newSocket.on("reconnect", () => {
      loadDashboardData(false);
      loadMidias();
    });

    setSocket(newSocket);

    return () =>
      newSocket.disconnect();
  }, [loadDashboardData]);

  useEffect(() => {
    if (!socket) return;

    let timeout;

    const handler = (event) => {
      if (
        !event?.turno ||
        event.turno === turno
      ) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
          loadDashboardData(
            false,
            event?.timestamp
          );
        }, 300);
      }
    };

    socket.on(
      "dashboard:update",
      handler
    );

    socket.on(
      "anuncios:update",
      loadMidias
    );

    return () => {
      socket.off(
        "dashboard:update",
        handler
      );

      socket.off(
        "anuncios:update",
        loadMidias
      );
    };
  }, [
    socket,
    turno,
    loadDashboardData,
  ]);

  // =========================
  // PESQUISA
  // =========================
  const normalizeText = (
    text = ""
  ) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .replace(/[-_/]/g, " ")
      .replace(
        /\b0+(\d+)\b/g,
        "$1"
      )
      .replace(/\s+/g, " ")
      .trim();

  const filteredData = useMemo(() => {
    if (!searchTerm.trim())
      return data;

    const term =
      normalizeText(searchTerm);

    return data.filter((item) => {
      const sala =
        normalizeText(item.sala);

      const turma =
        normalizeText(item.turma);

      const curso =
        normalizeText(item.curso);

      return (
        sala.includes(term) ||
        turma.includes(term) ||
        curso.includes(term)
      );
    });
  }, [data, searchTerm]);

  // =========================
  // DESKTOP = 2 TABELAS
  // MOBILE = 1 TABELA
  // =========================
  const metade = Math.ceil(
    filteredData.length / 2
  );

  const tabelaEsquerda =
    filteredData.slice(0, metade);

  const tabelaDireita =
    filteredData.slice(metade);

  return (
    <S.Body>
      <NavBar
        turno={turno}
        setTurno={setTurno}
        onOpenSidebar={() =>
          setIsSidebarOpen(true)
        }
      />

      {/* Pesquisa */}
      <S.SearchContainer>
        <S.SearchInput
          type="text"
          placeholder="Pesquisar sala, turma ou curso..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />

        {searchTerm && (
          <S.ClearButton
            onClick={() =>
              setSearchTerm("")
            }
          >
            ✕
          </S.ClearButton>
        )}
      </S.SearchContainer>

      <S.MainContent>
        <S.TablesContainer>
          {isMobile ? (
            <TableDashboard
              data={filteredData}
            />
          ) : (
            <>
              <TableDashboard
                data={tabelaEsquerda}
              />

              <TableDashboard
                data={tabelaDireita}
              />
            </>
          )}
        </S.TablesContainer>

        <S.RightSide>
          <S.VideoContainer>
            {midias.length > 0 ? (
              <Anuncio
                midia={
                  midias[indexMidia]
                }
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
