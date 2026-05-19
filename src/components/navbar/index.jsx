import * as S from "./style.js";
import logo from "../../assets/logo_senai.svg";
import { useEffect, useState } from "react";
import { safeLocaleDateString } from "../../utils/intlCompat.js";

export function NavBar({
  turno,
  setTurno,
  isTurnoAutomatico = true,
  disableTurnoSelection = false,
  showSidebarButton = true,
  onOpenSidebar,
}) {
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAgora(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const hora = agora
    .getHours()
    .toString()
    .padStart(2, "0");
  const minutos = agora
    .getMinutes()
    .toString()
    .padStart(2, "0");

  const data = new Date();
  const dataBR = safeLocaleDateString(data, "pt-BR");

  const handleOpenTvPage = () => {
    window.location.assign("/tv/index.html");
  };

  return (
    <S.Nav>
      <S.UL>
        <S.LiClick
          active={turno === "matutino"}
          isDisabled={disableTurnoSelection}
          onClick={() =>
            !disableTurnoSelection &&
            setTurno("matutino")
          }
        >
          Matutino
        </S.LiClick>

        <S.LiClick
          active={turno === "vespertino"}
          isDisabled={disableTurnoSelection}
          onClick={() =>
            !disableTurnoSelection &&
            setTurno("vespertino")
          }
        >
          Vespertino
        </S.LiClick>

        <S.LiClick
          active={turno === "noturno"}
          isDisabled={disableTurnoSelection}
          onClick={() =>
            !disableTurnoSelection &&
            setTurno("noturno")
          }
        >
          Noturno
        </S.LiClick>

        <S.ModeBadge
          data-mode={
            isTurnoAutomatico
              ? "automatico"
              : "manual"
          }
        >
          {isTurnoAutomatico
            ? "Turno automatico"
            : "Turno manual"}
        </S.ModeBadge>
      </S.UL>

      <S.UL>
        <S.Logo src={logo} alt="logo-senai" />
      </S.UL>

      <S.DateTimeUL>
        <S.DateBlock>
          <S.SpanTitleHora>Data Atual</S.SpanTitleHora>
          <S.SpanHora>{dataBR}</S.SpanHora>
        </S.DateBlock>

        <S.DateBlock>
          <S.SpanTitleHora>Hora Atual</S.SpanTitleHora>
          <S.SpanHora>{`${hora}:${minutos}`}</S.SpanHora>
        </S.DateBlock>
      </S.DateTimeUL>

      {showSidebarButton && (
        <S.UL>
          <S.TVButton
            type="button"
            onClick={handleOpenTvPage}
            title="Abrir pagina da TV"
            aria-label="Abrir pagina da TV"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
              <polyline points="17 2 12 7 7 2" />
            </svg>
          </S.TVButton>
          <S.SidebarButton onClick={onOpenSidebar}>
            Info
          </S.SidebarButton>
        </S.UL>
      )}
    </S.Nav>
  );
}
