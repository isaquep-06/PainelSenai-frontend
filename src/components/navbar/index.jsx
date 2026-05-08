import * as S from "./style.js";
import logo from "../../assets/logo_senai.svg";
import { useEffect, useState } from "react";

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
  const dataBR = data.toLocaleDateString("pt-BR");

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
          <S.SidebarButton onClick={onOpenSidebar}>
            Info
          </S.SidebarButton>
        </S.UL>
      )}
    </S.Nav>
  );
}
