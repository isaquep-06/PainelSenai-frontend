import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FooterLogin from './Footer/footerLogin.jsx';
import { loginSchema } from "../../schemas/loginSchemas.js";
import { loginAuth } from "../../services/authServices.js";

import imgLogin from '../../assets/login-senai.webp'
import logoSenai from '../../assets/logo_senai.svg'
import olhoFechado from '../../assets/olho-fechado.png'
import olhoAberto from '../../assets/olho-aberto.png'

import * as S from './style.js'
import { usePageTitle } from '../../styles/pageName.jsx';

function Login() {
  usePageTitle("Login");
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

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

  // Função para alternar visibilidade
  const togglePasswordVisibility = (e) => {
    e.preventDefault(); // Evita que o botão dê submit no form
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <S.DivPai>
        <S.DivTitle>
          <h1>Gestão de Salas e Turmas</h1>
        </S.DivTitle>

        <S.DivConainerLogin>
          <img src={imgLogin} alt="Senai" />
        </S.DivConainerLogin>

        <S.DivContainerForm>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.DivImgLogo>
              <img src={logoSenai} alt="Logo Senai" />
            </S.DivImgLogo>

            <S.Label>Usuário</S.Label>
            <S.Input
              type="text"
              placeholder="Digite seu usuário"
              {...register('username')}
            />
            <S.Error>{errors.username?.message}</S.Error>

            <S.Label>Senha</S.Label>
            <S.InputWrapper>
              <S.Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Digite sua senha"
                {...register('password')}
              />
              <S.TogglePasswordButton
                type="button"
                onClick={togglePasswordVisibility}
                tabIndex="-1" // Evita que o TAB pare no ícone se não quiser
              >
                <img
                  src={isPasswordVisible ? olhoAberto : olhoFechado}
                  alt={isPasswordVisible ? "Esconder senha" : "Mostrar senha"}
                />
              </S.TogglePasswordButton>
            </S.InputWrapper>
            <S.Error>{errors.password?.message}</S.Error>

            <S.Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Carregando..." : "Entrar"}
            </S.Button>
          </S.Form>
        </S.DivContainerForm>
      </S.DivPai>

      <FooterLogin />
    </>
  );
}

export default Login;
