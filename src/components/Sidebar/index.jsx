import React, {
  useEffect,
  useState,
} from "react";
import * as S from "./styles.js";

function parseLastUpdateDate(lastUpdate) {
  const rawTimestamp =
    lastUpdate?.timestamp ||
    lastUpdate?.updated_at ||
    lastUpdate?.updatedAt ||
    null;

  if (rawTimestamp) {
    const parsed = new Date(rawTimestamp);

    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  if (!lastUpdate?.data || !lastUpdate?.horario) {
    return null;
  }

  const [day, month, year] =
    lastUpdate.data.split("/");
  const [
    hour = "00",
    minute = "00",
    second = "00",
  ] = lastUpdate.horario.split(":");

  const parsed = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second)
  );

  return Number.isNaN(parsed.getTime())
    ? null
    : parsed;
}

function formatTimeAgo(lastUpdate) {
  const updateDate =
    parseLastUpdateDate(lastUpdate);

  if (!updateDate) return null;

  const diffMinutes = Math.round(
    (updateDate.getTime() - Date.now()) /
    60000
  );

  const rtf = new Intl.RelativeTimeFormat(
    "pt-BR",
    { numeric: "auto" }
  );

  if (Math.abs(diffMinutes) < 60) {
    return rtf.format(diffMinutes, "minute");
  }

  const diffHours = Math.round(
    diffMinutes / 60
  );

  if (Math.abs(diffHours) < 24) {
    return rtf.format(diffHours, "hour");
  }

  const diffDays = Math.round(
    diffHours / 24
  );

  return rtf.format(diffDays, "day");
}

function buildLastUpdateText(lastUpdate) {
  if (!lastUpdate) {
    return "Ainda nao houve nenhuma alteracao publicada no sistema.";
  }

  const turnos =
    Array.isArray(lastUpdate.turnos) &&
      lastUpdate.turnos.length > 0
      ? lastUpdate.turnos.join(", ")
      : null;

  const turnoText =
    turnos ||
    lastUpdate.turno ||
    "nao informado";

  const responsavel =
    lastUpdate.updated_by ||
    "usuario desconhecido";

  const entityType =
    lastUpdate.entity_type || "registro";

  const relativeTime =
    formatTimeAgo(lastUpdate);

  const whenText = relativeTime
    ? `Atualizado ${relativeTime}`
    : `Atualizado em ${lastUpdate.data || "--"} as ${lastUpdate.horario || "--"
    }`;

  return `${whenText} • ${turnoText}`;
}

function getHoursDifference(lastUpdate) {
  const updateDate =
    parseLastUpdateDate(lastUpdate);

  if (!updateDate) return null;

  const diffHours = Math.round(
    (Date.now() - updateDate.getTime()) /
    3600000
  );

  return diffHours;
}

function isUpdateWithin10Hours(lastUpdate) {
  const hoursDiff =
    getHoursDifference(lastUpdate);

  return (
    hoursDiff !== null && hoursDiff <= 10
  );
}

export function Sidebar({
  isOpen,
  onClose,
  lastUpdate,
  onRefresh,
}) {
  const [currentTime, setCurrentTime] =
    useState(new Date());
  const [updateHistory, setUpdateHistory] =
    useState([]);
  const [showHistory, setShowHistory] =
    useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (lastUpdate) {
      setUpdateHistory((prev) => {
        // Verifica se o primeiro item já é igual ao lastUpdate
        if (prev.length > 0 && prev[0] === lastUpdate) {
          return prev;
        }

        const newHistory = [
          lastUpdate,
          ...prev,
        ];
        return newHistory.slice(0, 4);
      });
    }
  }, [lastUpdate]);

  useEffect(() => {
    function handleClickOutside(event) {
      const historyContainer =
        document.querySelector(
          '[data-history-container]'
        );

      if (
        historyContainer &&
        !historyContainer.contains(event.target)
      ) {
        setShowHistory(false);
      }
    }

    if (showHistory) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
      return () => {
        document.removeEventListener(
          "mousedown",
          handleClickOutside
        );
      };
    }
  }, [showHistory]);

  const formattedTime =
    currentTime.toLocaleTimeString(
      "pt-BR",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    );
  const formattedDate =
    currentTime.toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

  const formattedLastUpdate =
    buildLastUpdateText(lastUpdate);

  const handleRefresh = async () => {
    if (onRefresh) {
      await onRefresh();
    }
  };

  return (
    <>
      <S.Overlay
        isOpen={isOpen}
        onClick={onClose}
      />
      <S.SidebarContainer isOpen={isOpen}>
        <S.DragBar />
        <S.CloseButton onClick={onClose}>
          x
        </S.CloseButton>
        <S.Title>Informacoes do Sistema</S.Title>

        <S.InfoCard>
          <S.InfoLabel>
            Horario em tempo real
          </S.InfoLabel>
          <S.ClockValue>{formattedTime}</S.ClockValue>
          <S.DateValue>{formattedDate}</S.DateValue>
        </S.InfoCard>

        <S.InfoCard>
          <S.InfoLabelContainer>
            <S.InfoLabel>
              Ultima atualizacao dos dados
            </S.InfoLabel>
            <S.HistoryContainer
              data-history-container
            >
              <S.HistoryButton
                onClick={() =>
                  setShowHistory(!showHistory)
                }
              >
                +
              </S.HistoryButton>
              {showHistory && (
                <S.HistoryModal>
                  {updateHistory
                    .filter(
                      isUpdateWithin10Hours
                    )
                    .map((update, idx) => (
                      <S.HistoryItem key={idx}>
                        <S.HistoryItemTime>
                          {formatTimeAgo(
                            update
                          )}
                        </S.HistoryItemTime>
                        <S.HistoryItemContent>
                          {buildLastUpdateText(
                            update
                          )}
                        </S.HistoryItemContent>
                      </S.HistoryItem>
                    ))}
                  {updateHistory.filter(
                    isUpdateWithin10Hours
                  ).length === 0 && (
                      <S.HistoryItem>
                        <S.HistoryItemContent>
                          Nenhuma atualização
                          nos últimos 10 horas
                        </S.HistoryItemContent>
                      </S.HistoryItem>
                    )}
                </S.HistoryModal>
              )}
            </S.HistoryContainer>
          </S.InfoLabelContainer>
          <S.UpdateValue>
            {formattedLastUpdate}
          </S.UpdateValue>
          {lastUpdate?.timezone && (
            <S.DateValue>
              Timezone do servidor:{" "}
              {lastUpdate.timezone}
            </S.DateValue>
          )}
          <S.RefreshButton onClick={handleRefresh}>
            Atualizar agora
          </S.RefreshButton>
        </S.InfoCard>

        <S.Footer>
          <S.SenaiBadge>
            SENAI - Tecnologia que transforma
          </S.SenaiBadge>
          <p
            style={{
              color: "#6b6b6bbe",
              marginTop: "20px",
            }}
          >
            © 2026 Isaque Portugal | Turma DDS-4
          </p>
        </S.Footer>
      </S.SidebarContainer>
    </>
  );
}
