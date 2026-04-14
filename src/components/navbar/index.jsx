// Api dashboard
import { dashboardApi } from "../../services/dashboard.js";
// Styles
import * as S from './style.js'
// IMGS -> Assets
import logo from '../../assets/logo_senai.svg'
export function NavBar({ turno, setTurno }) {
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

      <S.UL>
        <S.LI>{turno.trim().toUpperCase()}</S.LI>
      </S.UL>

    </S.Nav>
  )
}

