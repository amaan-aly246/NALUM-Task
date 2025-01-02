// import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { BrowserRouter } from "react-router"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client"

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_SERVER,
  cache: new InMemoryCache(),
})
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
  // </StrictMode>
)
