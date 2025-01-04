import { v4 as uuid } from "uuid"
import mongoose, { Document, Schema } from "mongoose"

export interface IUser extends Document {
  name: string
  password: string
  // age: number
  //   profileIconUrl?: string
  //   isVerified: boolean
  email: string
  refreshToken: string
  //   personalMail?: string
  //   branchInfo: {
  //     degree: string
  //     year: number
  //     branchName: string
  //     branchCode: string
  //   }
  //   contact: number
  //   skills: string[]
  //   experience: {
  //     company: {
  //       name: string
  //       position: string
  //       tenure: {
  //         from: string
  //         to?: string
  //       }
  //     }
  //   }
  //   posts: string[]
}

const userSchema = new Schema<IUser>({
  name: { type: String },
  password: { type: String, required: true },
  refreshToken: { type: String, default: "" },
  // age: { type: Number, required: true },
  //   profileIconUrl: { type: String },
  //   isVerified: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  //   personalMail: { type: String },
  //   branchInfo: {
  //     degree: { type: String, required: true },
  //     year: { type: Number, required: true },
  //     branchName: { type: String, required: true },
  //     branchCode: { type: String, required: true },
  //   },
  //   contact: { type: Number, required: true },
  //   skills: { type: [String], required: true },
  //   experience: {
  //     company: {
  //       name: { type: String, required: true },
  //       position: { type: String, required: true },
  //       tenure: {
  //         from: { type: String, required: true },
  //         to: { type: String },
  //       },
  //     },
  //   },
  //   posts: { type: [String], required: true },
})

const UserModel = mongoose.model<IUser>("User", userSchema)

export default UserModel
