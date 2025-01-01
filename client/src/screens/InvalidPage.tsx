import { Button } from "@/components/ui/button"
import { Link } from "react-router"

function InvalidPage() {
  return (
    <>
      <div className="bg-fuchsia-200 flex-col gap-11 h-screen items-center  ">
        <span className="text-8xl">404</span>
        <Button className="bg-red-400">
          <Link to="/">Go to Home</Link>
        </Button>
      </div>
    </>
  )
}

export default InvalidPage
