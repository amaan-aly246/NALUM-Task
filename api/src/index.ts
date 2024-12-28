import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import dotenv from "dotenv"
dotenv.config()
const port = Number(process.env.PORT || 8000)

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
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  })

  console.log(`server : ${url}`)
}
main()
