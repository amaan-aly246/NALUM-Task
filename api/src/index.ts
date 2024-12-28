import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import dotenv from "dotenv"
import { connectDb } from "./config/connectDb.ts"
dotenv.config()
const port = Number(process.env.PORT || 8000)
const connectionURL = String(process.env.DATABASE_URL)
const typeDefs = `#graphql
        type Query {
            hello: String
        }
`

const resolvers = {
  Query: {
    hello: () => "hello graphQL",
  },
}

const main = async (): Promise<void> => {
  const server = new ApolloServer({
    typeDefs,
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
main()
