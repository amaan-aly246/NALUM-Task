import { Home, BadgePlus } from "lucide-react"

import { Link } from "react-router"
import Login from "../components/AuthModel"
function Footer() {
  return (
    <>
      <div className="bg-fuchsia-200  fixed bottom-0 left-0 right-0 flex justify-around p-3 cursor-pointer">
        <span>
          <Link to="/">
            <Home color="#7981ec" />
          </Link>
        </span>
        <span>
          <Link to="/create">
            <BadgePlus color="#7981ec" />
          </Link>
        </span>
        <span>
          <Login/>
        </span>
      </div>
    </>
  )
}

export default Footer
