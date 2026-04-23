import * as yup from "yup";

export const updateSchema = yup.object().shape({
  name: yup.string(),
  turno: yup.string(),
  sala_id: yup.number().nullable(),
});

export const createSchema = yup.object().shape({
  name: yup.string().required('Nome da turma é obrigatorío'),
  turno: yup.string().required('Turno é obritatorío'),
  sala_id: yup.number().nullable()
})