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
    setIsLogged(true)
    try {
      const isLoading = isSubmitting ? true : false
      if (isLoading) {
        toast.loading("Carregando")
      }
      // Enviar dados para rota de login!
      await loginAuth(data)
      const userDataRaw = localStorage.getItem('PainelSenai:DataUser');
      const userData = userDataRaw ? JSON.parse(userDataRaw) : null;
      const usernameLocalStorage = userData?.username || 'Convidado';

      // Notificação para login bem sucedido! (sonner)
      toast.success(
        <span>Bem vindo (a) <b>{usernameLocalStorage}</b></span>
      );


      setTimeout(() => {
        navigate("/dashboard")
      }, 3500);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "nome de usuário ou senha incorretos"
      )
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

          <S.Button type="submit" disabled={isSubmitting || isLogged}>
            {isSubmitting ? "Carregando..." : isLogged ? "Logado" : "Entrar"}
          </S.Button>

        </S.Form>
      </S.DivContainerForm>


    </S.DivPai>

    <FooterLogin />
  </>
  )
}

export default Login;