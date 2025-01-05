export type AuthResponse = {
  success: string
  message: string
  token?: string
  email?: string;
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

export type User = {
  name : string
  email: string
  profileImgUrl? : string
}

export type PostType = {
  creator: string
  title: string
  content: string
  createdAt?: string
  likes?: number
}