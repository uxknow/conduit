import * as yup from 'yup'

export const registerSchema = yup.object({
  username: yup.string().required().min(3).max(16),
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(16)
})

export const loginSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required()
})