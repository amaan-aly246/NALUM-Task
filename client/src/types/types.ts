export type AuthResponse = {
  success: string
  message: string
  token?: string
}

export type LoginDetails = {
  email: string
  password: string
}

export type SignupDetails = {
  name: string
  email: string
  password: string
}