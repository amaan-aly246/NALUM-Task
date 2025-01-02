import UserModel, { IUser } from "../models/user.model"
export const getAllUsers = async (): Promise<IUser[]> => {
  const result = await UserModel.find({})
  return result
}

export const createUser = async (
  _: any,
  { mail, password, name }: { mail: string; password: string; name: string }
): Promise<string> => {
  const response = await UserModel.create({
    password,
    mail,
    name,
  })
  return "Created "
}

export const loginUser = async (
  _: any,
  { mail, password }: { mail: string; password: string }
): Promise<{ success: boolean; token?: string; message?: string }> => {
  const response = await UserModel.findOne({ mail })
  if (!response) {
    console.log(response)
  }
  return {
    success: true,
  }
}
