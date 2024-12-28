import { connect, Mongoose } from "mongoose"

export const connectDb = async (
  connectionString: string
): Promise<Mongoose> => {
  return await connect(connectionString)
}
