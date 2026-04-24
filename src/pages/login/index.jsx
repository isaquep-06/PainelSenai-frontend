// React hooks
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// UI -> Footer | NavBar
import FooterLogin from './Footer/footerLogin.jsx';

// Schema
import { loginSchema } from "../../schemas/loginSchemas.js";

// Login -> Services
import { loginAuth } from "../../services/authServices.js";

// Imagen Senai Civit
import imgLogin from '../../assets/login-senai.webp'
import logoSenai from '../../assets/logo_senai.svg'


// Style -> Estilo
import * as S from './style.js'

function Login() {
  const navigate = useNavigate()

  const [isLogged, setIsLogged] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })


  // Função para enviar ou recusar login!
  async function onSubmit(data) {
    try {
      await loginAuth(data);

      const userDataRaw = localStorage.getItem('PainelSenai:DataUser');
      const userData = userDataRaw ? JSON.parse(userDataRaw) : null;

      const username = userData?.username || 'Convidado';

      toast.success(
        <span>Bem-vindo(a) <b>{username}</b></span>
      );

      setTimeout(() => {
        navigate("/dashboard-admin");
      }, 1500);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Usuário ou senha incorretos"
      );
    }
  }


  return (
    <>
      <S.DivPai>
        <S.DivTitle>
          <h1>Gestão de Salas e Turmas</h1>
        </S.DivTitle>


        {/* IMAGEM (ESQUERDA) */}
        <S.DivConainerLogin>
          <img src={imgLogin} alt="Senai" />
        </S.DivConainerLogin>


        {/* FORM (DIREITA) */}
        <S.DivContainerForm>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.DivImgLogo>
              <img src={logoSenai} alt="Logo Senai" />
            </S.DivImgLogo>
            <S.Label>Usuário</S.Label>
            <S.Input
              type="text"
              placeholder="Usuário"
              {...register('username')}
            />
            <S.Error>{errors.username?.message}</S.Error>

            <S.Label>Senha</S.Label>
            <S.Input
              type="password"
              placeholder="Senha"
              {...register('password')}
            />
            <S.Error>{errors.password?.message}</S.Error>

            <S.Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Carregando..." : "Entrar"}
            </S.Button>

          </S.Form>
        </S.DivContainerForm>


      </S.DivPai>

      <FooterLogin />
    </>
  )
}

export default Login;