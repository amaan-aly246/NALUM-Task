import "./index.css"
import CreatePost from "./screens/CreatePost"
import Footer from "./screens/Footer"
import Home from "./screens/Home"
import InvalidPage from "./screens/InvalidPage"
import Navigation from "./screens/Navigation"
import { Route, Routes } from "react-router"
import Profile from "./screens/Profile"
function App() {
  return (
    <>
      <Routes>
        <Route  element={<Navigation />}>
          <Route path="/" element={<Home />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<InvalidPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
