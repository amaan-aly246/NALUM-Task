export type AuthResponse = {
  success: boolean
  token?: string
  message: string
}

export type User = {
  name: string
  email: string
}

export type PostType = {
  creator: string
  title: string
  content: string
  createdAt?: string
  likes?: number
}

export type CreatePostResponse = {
  success : boolean,
  message: string
}
