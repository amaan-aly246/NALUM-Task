import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { BrowserRouter } from "react-router"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { UserProvider } from "./context/UserContext.tsx"
UserProvider
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_SERVER, // GraphQL server URL
})

// Set up the auth link to include the token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token")

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <UserProvider>
        <App />
      </UserProvider>
    </ApolloProvider>
  </BrowserRouter>
)
