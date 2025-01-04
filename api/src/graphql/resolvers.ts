import UserModel, { IUser } from "../models/user.model"
import { AuthResponse } from "../types/types"
import { compare, hash } from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const SALT_ROUND: number = 10
export const getAllUsers = async (): Promise<IUser[]> => {
  const result = await UserModel.find({})
  return result
}

export const createUser = async (
  _: any,
  { mail, password, name }: { mail: string; password: string; name: string }
): Promise<AuthResponse> => {
  const isUserExit: null | IUser = await UserModel.findOne({ mail })
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
    mail,
    name,
  })
  return {
    success: true,
    message: "User created successfully",
  }
}

export const loginUser = async (
  _: any,
  { mail, password }: { mail: string; password: string }
): Promise<AuthResponse> => {
  try {
    const user: null | IUser = await UserModel.findOne({ mail })
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
      // incorrect password by the user
      return {
        success: false,
        message: "Incorrect password",
      }
    }

    // generate jwt token
    const accessToken = jwt.sign(
      { mail: user.mail },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "30s" }
    )
    const refreshToken = jwt.sign(
      { mail: user.mail },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "30s" }
    )
    
    // update the refresh token
    await UserModel.findOneAndUpdate({mail}, {refreshToken})
    return {
      success : true,
      message : "logged in successfully",
      token : accessToken
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error while login.",
    }
  }
}
