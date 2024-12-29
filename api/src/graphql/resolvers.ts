import UserModel , {IUser} from "../models/user.model"
export const getAllUsers = async (): Promise<IUser[]> => {
    const result = await UserModel.find({})
    // console.log(result)
    return result
  }