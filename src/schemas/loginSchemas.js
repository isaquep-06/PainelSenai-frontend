import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Minimo 3 caracteres")
    .required("Nome de usuario é obrigatorío"),

  password: yup
    .string()
    .min(6, "Minimo 6 caracteres")
    .required("Senha é obrigatorío")
})