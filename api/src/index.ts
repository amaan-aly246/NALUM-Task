import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import dotenv from "dotenv"
import { connectDb } from "./config/connectDb.ts"
import { schema } from "./graphql/typeDefs.ts"
import {
  getAllUsers,
  createUser,
  loginUser,
  testQuery,
  getUser,
} from "./graphql/resolvers.ts"
import { authMiddleware } from "./middleware/auth.ts"
dotenv.config()
const port = Number(process.env.PORT || 8000)
const connectionURL = String(process.env.DATABASE_URL)

const resolvers = {
  Query: {
    Users: getAllUsers,
    User: async (_: any, args: { email: string }) => {
      return getUser(args.email)
    },
    Test: async (parent: any, args: any, context: any) => {
      return authMiddleware(testQuery, parent, args, context)
    },
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
      context: async ({ req }) => {
        return { req }
      }, // Pass request to context for middleware
    })
    console.log(`server : ${url}`)
  } catch (error) {
    console.log(error)
  }
}
start()
