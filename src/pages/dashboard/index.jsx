import { io } from "socket.io-client";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { toast } from "react-toastify";
import * as S from "./style.js";

import TableDashboard from "../../components/dashboard/tableDashboard.jsx";
import TurmaUpdateModal from "../../components/dashboard/turmaUpdateModal.jsx";
import { NavBar } from "../../components/navbar/index.jsx";
import Anuncio from "../../components/Anuncio/index.jsx";
import { Sidebar } from "../../components/Sidebar/index.jsx";
import QRCode from "../../components/qrcode/index.jsx";

import api from "../../services/api";
import {
  getLastDashboardUpdate,
} from "../../services/dashboard.js";
import { getSalas } from "../../services/salaServices.js";
import { getTurma } from "../../services/turmaService.js";
import { getUploads } from "../../services/uploadService.js";
import { usePageTitle } from "../../styles/pageName.jsx";

const socketUrl =
  import.meta.env.VITE_API_URL ||
  "https://painelsenai-production.up.railway.app";

function normalizeText(text = "") {
  return text
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
}

function getUserData() {
  try {
    const stored = localStorage.getItem(
      "PainelSenai:DataUser"
    );

    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function getTurnoAtual() {
  const hora = new Date().getHours();

  if (hora >= 6 && hora < 12) return "matutino";
  if (hora >= 12 && hora < 18) return "vespertino";

  return "noturno";
}

function Dashboard() {
  usePageTitle("Dashboard");

  const socketRef = useRef(null);
  const [turno, setTurno] = useState(getTurnoAtual());
  const [isTurnoAutomatico, setIsTurnoAutomatico] =
    useState(true);
  const [data, setData] = useState([]);
  const [salas, setSalas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [userData, setUserData] = useState(
    getUserData
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [midias, setMidias] = useState([]);
  const [indexMidia, setIndexMidia] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);
  const [selectedRow, setSelectedRow] =
    useState(null);
  const [lastUpdate, setLastUpdate] =
    useState(null);

  const isLoggedIn = Boolean(userData?.token);

  function checkMobile() {
    const width = window.innerWidth;

    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    return width <= 900 && isTouchDevice;
  }

  const [isMobile, setIsMobile] = useState(checkMobile());

  useEffect(() => {
    const resize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener(
        "orientationchange",
        resize
      );
    };
  }, []);

  const nextMidia = useCallback(() => {
    setIndexMidia((prev) => {
      if (midias.length === 0) {
        return 0;
      }

      return (prev + 1) % midias.length;
    });
  }, [midias.length]);

  const loadMidias = useCallback(async () => {
    try {
      const data = await getUploads();
      const ativos = data.filter(
        (item) => item.active === true && item.url
      );

      setMidias((prev) => {
        setIndexMidia((currentIndex) => {
          if (ativos.length === 0) {
            return 0;
          }

          const currentMediaId =
            prev[currentIndex]?.id;

          if (!currentMediaId) {
            return Math.min(
              currentIndex,
              ativos.length - 1
            );
          }

          const nextIndex = ativos.findIndex(
            (item) => item.id === currentMediaId
          );

          return nextIndex >= 0 ? nextIndex : 0;
        });

        return ativos;
      });
    } catch (error) {
      console.error(
        "Erro ao carregar midias:",
        error
      );
    }
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void loadMidias();
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [loadMidias]);

  useEffect(() => {
    const syncUserData = () => {
      setUserData(getUserData());
    };

    window.addEventListener(
      "storage",
      syncUserData
    );

    syncUserData();

    return () =>
      window.removeEventListener(
        "storage",
        syncUserData
      );
  }, []);

  const loadReferenceData = useCallback(
    async () => {
      if (!isLoggedIn) {
        setSalas([]);
        setTurmas([]);
        return;
      }

      try {
        const [salasData, turmasData] =
          await Promise.all([
            getSalas(),
            getTurma(),
          ]);

        setSalas(salasData || []);
        setTurmas(turmasData || []);
      } catch (error) {
        setSalas([]);
        setTurmas([]);
        console.error(
          "Erro ao carregar dados auxiliares do dashboard:",
          error
        );
      }
    },
    [isLoggedIn]
  );

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void loadReferenceData();
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [loadReferenceData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTurnoAutomatico) return;

      const novoTurno = getTurnoAtual();

      setTurno((prev) =>
        prev !== novoTurno
          ? novoTurno
          : prev
      );
    }, 60000);

    return () => clearInterval(interval);
  }, [isTurnoAutomatico]);

  const handleTurnoChange = useCallback(
    (novoTurno) => {
      setIsTurnoAutomatico(false);
      setTurno(novoTurno);
    },
    []
  );

  const loadLastUpdate = useCallback(async () => {
    try {
      const latestUpdate =
        await getLastDashboardUpdate();

      setLastUpdate(latestUpdate);
      return latestUpdate;
    } catch (error) {
      setLastUpdate(null);
      console.error(
        "Erro ao carregar ultima atualizacao:",
        error
      );
      return null;
    }
  }, []);

  const loadDashboardData = useCallback(
    async (showToast = false) => {
      try {
        const res = await api.get(
          `/dashboard?turno=${turno}`
        );

        setData(res.data || []);
        await loadLastUpdate();

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
    [loadLastUpdate, turno]
  );

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void loadDashboardData();
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [turno, loadDashboardData]);

  useEffect(() => {
    const newSocket = io(socketUrl, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    newSocket.on("reconnect", () => {
      loadDashboardData(false);
      loadMidias();
    });

    socketRef.current = newSocket;

    return () => {
      socketRef.current = null;
      newSocket.disconnect();
    };
  }, [loadDashboardData, loadMidias]);

  useEffect(() => {
    const socket = socketRef.current;

    if (!socket) return;

    let timeout;

    const handler = (event) => {
      if (
        !event?.turno ||
        event.turno === turno
      ) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
          loadDashboardData(false);
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
    turno,
    loadDashboardData,
    loadMidias,
  ]);

  const enrichedData = useMemo(() => {
    const salasByName = new Map(
      salas.map((sala) => [
        normalizeText(sala.name),
        sala,
      ])
    );

    return data.map((item) => {
      const salaName = normalizeText(
        item.sala
      );
      const turmaName = normalizeText(
        item.turma
      );

      const matchedSala =
        salasByName.get(salaName);

      const matchedTurma = turmas.find(
        (turma) => {
          const turmaMatches =
            normalizeText(turma.name) ===
            turmaName;
          const turnoMatches =
            turma.turno === turno;
          const salaMatches =
            !matchedSala ||
            turma.sala_id === matchedSala.id;

          return (
            turmaMatches &&
            turnoMatches &&
            salaMatches
          );
        }
      );

      return {
        ...item,
        turno,
        turma_id:
          item.turma_id ||
          item.id_turma ||
          matchedTurma?.id ||
          null,
        sala_id:
          item.sala_id ||
          item.id_sala ||
          matchedSala?.id ||
          matchedTurma?.sala_id ||
          null,
        sala_type:
          item.sala_type ||
          item.type ||
          matchedSala?.type ||
          null,
      };
    });
  }, [data, salas, turno, turmas]);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim())
      return enrichedData;

    const term =
      normalizeText(searchTerm);

    return enrichedData.filter((item) => {
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
  }, [enrichedData, searchTerm]);

  const sortedData = useMemo(() => {
    const typePriority = {
      comum: 0,
      laboratorio: 1,
      especial: 2,
    };

    return [...filteredData].sort(
      (left, right) => {
        const leftPriority =
          typePriority[left.sala_type] ?? 3;
        const rightPriority =
          typePriority[right.sala_type] ?? 3;

        if (leftPriority !== rightPriority) {
          return (
            leftPriority - rightPriority
          );
        }

        if (
          left.sala_type === "especial" &&
          right.sala_type === "especial"
        ) {
          return normalizeText(
            left.sala
          ).localeCompare(
            normalizeText(right.sala),
            "pt-BR"
          );
        }

        const salaCompare =
          normalizeText(
            left.sala
          ).localeCompare(
            normalizeText(right.sala),
            "pt-BR",
            { numeric: true }
          );

        if (salaCompare !== 0) {
          return salaCompare;
        }

        return normalizeText(
          left.turma
        ).localeCompare(
          normalizeText(right.turma),
          "pt-BR",
          { numeric: true }
        );
      }
    );
  }, [filteredData]);

  const handleSelectRow = useCallback(
    (row) => {
      setSelectedRow(row);
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setSelectedRow(null);
  }, []);

  const handleUpdateSuccess = useCallback(
    async () => {
      await Promise.all([
        loadDashboardData(false),
        loadReferenceData(),
        loadLastUpdate(),
      ]);
    },
    [
      loadDashboardData,
      loadLastUpdate,
      loadReferenceData,
    ]
  );

  const metade = Math.ceil(
    sortedData.length / 2
  );

  const tabelaEsquerda =
    sortedData.slice(0, metade);

  const tabelaDireita =
    sortedData.slice(metade);

  return (
    <S.Body>
      <NavBar
        turno={turno}
        setTurno={handleTurnoChange}
        isTurnoAutomatico={
          isTurnoAutomatico
        }
        onOpenSidebar={() =>
          setIsSidebarOpen(true)
        }
      />

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
            x
          </S.ClearButton>
        )}
      </S.SearchContainer>

      <S.MainContent>
        <S.TablesContainer>
          {isMobile ? (
            <TableDashboard
              data={sortedData}
              showActions={isLoggedIn}
              onSelectRow={
                handleSelectRow
              }
            />
          ) : (
            <>
              <TableDashboard
                data={tabelaEsquerda}
                showActions={isLoggedIn}
                onSelectRow={
                  handleSelectRow
                }
              />

              <TableDashboard
                data={tabelaDireita}
                showActions={isLoggedIn}
                onSelectRow={
                  handleSelectRow
                }
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
                Nenhum anuncio ativo
              </span>
            )}
          </S.VideoContainer>
        </S.RightSide>
      </S.MainContent>

      {!isMobile && sortedData.length <= 16 && <QRCode />}

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

      <TurmaUpdateModal
        isOpen={Boolean(selectedRow)}
        row={selectedRow}
        onClose={handleCloseModal}
        onSuccess={handleUpdateSuccess}
      />
    </S.Body>
  );
}

export default Dashboard;
