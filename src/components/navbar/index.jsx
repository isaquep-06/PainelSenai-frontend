import * as S from './style.js';
import logo from '../../assets/logo_senai.svg';
import { useEffect, useState } from 'react';

export function NavBar({ turno, setTurno, onOpenSidebar }) {
  // Estado para guardar o horario atual
  const [agora, setAgora] = useState(new Date())

  // useEfect para atualização
  useEffect(() => {
    const intervalo = setInterval(() => {
      setAgora(new Date())
    }, 1000)

    return () => clearInterval(intervalo);
  }, []);

  // Separando -> HORA | MINUTOS | SEGUNDOS
  const hora = agora.getHours().toString().padStart(2, '0')
  const minutos = agora.getMinutes().toString().padStart(2, '0')
  const segundos = agora.getSeconds().toString().padStart(2, '0')

  // Data em formato brasileiro -> DIA/MES/ANO
  const data = new Date();
  const dataBR = data.toLocaleDateString('pt-BR');


  return (
    <S.Nav>
      <S.UL>
        <S.LiClick
          active={turno === "matutino"}
          onClick={() => setTurno("matutino")}
        >
          Matutino
        </S.LiClick>

        <S.LiClick
          active={turno === "vespertino"}
          onClick={() => setTurno("vespertino")}
        >
          Vespertino
        </S.LiClick>

        <S.LiClick
          active={turno === "noturno"}
          onClick={() => setTurno("noturno")}
        >
          Noturno
        </S.LiClick>
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

      <S.UL>
        <S.SidebarButton onClick={onOpenSidebar}>
          Info
        </S.SidebarButton>
      </S.UL>
    </S.Nav>
  );
}