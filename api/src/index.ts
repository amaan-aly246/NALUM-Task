import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import dotenv from "dotenv"
import { connectDb } from "./config/connectDb.ts"
import { schema } from "./graphql/typeDefs.ts"
import { getAllUsers, createUser, loginUser } from "./graphql/resolvers.ts"
dotenv.config()
const port = Number(process.env.PORT || 8000)
const connectionURL = String(process.env.DATABASE_URL)

const resolvers = {
  Query: {
    Users: getAllUsers,
  },
  Mutation: {
    createUser,
    loginUser,
  },
}

const start = async (): Promise<void> => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  })
  try {
    await connectDb(connectionURL)
    const { url } = await startStandaloneServer(server, {
      listen: { port },
    })
    console.log(`server : ${url}`)
  } catch (error) {
    console.log(error)
  }
}
start()
