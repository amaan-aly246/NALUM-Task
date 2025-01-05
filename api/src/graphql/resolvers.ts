import UserModel, { IUser } from "../models/user.model"
import PostModel, { IPost } from "../models/post.model"
import { AuthResponse, CreatePostResponse, PostType } from "../types/types"
import { compare, hash } from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { User } from "../types/types"
dotenv.config()
const SALT_ROUND: number = 10
export const testQuery = async (
  parent: any,
  args: any,
  context: any
): Promise<string> => {
  console.log("value in context:", context)
  return "This is a test query"
}
export const getAllUsers = async (): Promise<User[]> => {
  const result = await UserModel.find({})
  return result
}

export const createUser = async (
  _: any,
  { email, password, name }: { email: string; password: string; name: string }
): Promise<AuthResponse> => {
  const isUserExit: null | IUser = await UserModel.findOne({ email })
  // check if user is already exits in the db or not.
  if (isUserExit) {
    return {
      success: false,
      message: "User already exits.",
    }
  }
  // generate hash password and store data in db
  const hashedPassword = await hash(password, SALT_ROUND)
  await UserModel.create({
    password: hashedPassword,
    email,
    name,
  })
  return {
    success: true,
    message: "User created successfully",
  }
}

export const loginUser = async (
  _: any,
  { email, password }: { email: string; password: string }
): Promise<AuthResponse> => {
  try {
    const user: null | IUser = await UserModel.findOne({ email })
    // user does not exits
    if (!user) {
      return {
        success: false,
        message: "user does not exist",
      }
    }

    // compare password for user which exist in the db
    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Incorrect password",
      }
    }

    // generate jwt token
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "1hr" }
    )
    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "30s" }
    )

    // update the refresh token
    await UserModel.findOneAndUpdate({ email }, { refreshToken })
    return {
      success: true,
      message: "logged in successfully",
      token: accessToken,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error while login.",
    }
  }
}

export const getUser = async (email: string): Promise<User | null> => {
  try {
    const response = await UserModel.findOne({ email })

    if (!response) {
      console.log(`No user found with email: ${email}`)
      return null
    }
    const data = {
      name: response.name,
      email: response.email,
    }
    return data
  } catch (error: any) {
    console.error("Error fetching user:", error.message || error)
    throw new Error("Unable to fetch user. Please try again.")
  }
}

export const createPost = async (
  _: any,
  { creator, title, content}: PostType
): Promise<CreatePostResponse> => {
  const postData = {
    title,
    content,
    creator,
  }
  try {
    const response = await PostModel.create(postData)
    if (!response) {
      return {
        success: false,
        message: "Unable to create post",
      }
    }
    return {
      success: true,
      message: "post created ",
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error in creating post ",
    }
  }
}
