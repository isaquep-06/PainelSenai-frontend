// React hooks
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Schema
import { loginSchema } from "../../schemas/loginSchemas.js";

// Login -> Services
import { loginAuth } from "../../services/authServices.js";

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
      <form onSubmit={handleSubmit(onSubmit)}>

        <label>Usuário</label>
        <input
          type="text"
          placeholder="Usuario"
          {...register('username')}
        />
        <span>{errors.username?.message}</span>

        <label>Senha</label>
        <input
          type="text"
          placeholder="Senha"
          {...register('password')}
        />
        <span>{errors.password?.message}</span>

        <button type="submit" disabled={isSubmitting || isLogged}>
          {isSubmitting ? "Carregando..." : isLogged ? "Logado" : "Entrar"}
        </button>
      </form>
    </>
  )
}

export default Login;