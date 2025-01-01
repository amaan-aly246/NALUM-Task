import "./index.css"
import Create from "./screens/Create"
import Footer from "./screens/Footer"
import Home from "./screens/Home"
import InvalidPage from "./screens/InvalidPage"
import Navigation from "./screens/Navigation"
import { Route, Routes } from "react-router"
function App() {
  return (
    <>
      <Routes>
        <Route  element={<Navigation />}>
          <Route path="/" element={<Home />} />
          <Route path="create" element={<Create />} />
        </Route>
        <Route path="*" element={<InvalidPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
