import * as yup from 'yup'

// Schema para criar uma sala -> Espaço de aula
export const createSchemaSala = yup.object().shape({
  name: yup
    .string()
    .required('Nome da sala é obrigatorío, ex: LAB 1'),

  type: yup
    .string()
    .required('Tipo da sala é obrigatorío, ex: laboratorio')
})


// Schema para atualizar uma sala existente -> Espaço de aula!
export const updateSchemaSala = yup.object().shape({
  name: yup.string(),
  type: yup.string()
})