import { Home, BadgePlus, User } from "lucide-react"
import { Link } from "react-router"
import AuthModal from "../components/AuthModel"
// import { TEST_QUERY } from "@/graphql/Query/user.query"
// import { useLazyQuery } from "@apollo/client"
import UserContext from "@/context/UserContext"
import { IUserContext } from "@/context/UserContext"
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
function Footer() {
  // const [testQuery, { data, error }] = useLazyQuery(TEST_QUERY)
  const context = useContext<IUserContext | null>(UserContext)
  const user = context ? context.user : null
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className="bg-fuchsia-200  fixed bottom-0 left-0 right-0 flex justify-around p-3 cursor-pointer">
        <span>
          <Link to="/">
            <Home color="#7981ec" />
          </Link>
        </span>
        <span
          onClick={() => {
            console.log("create")
            user ? navigate("/create") : setOpen(true)
          }}>
          <BadgePlus color="#7981ec" />
        </span>

        {user ? (
          <Link to="/profile">
            <User color="#7981ec" />
          </Link>
        ) : (
          <span>
            <AuthModal open={open} setOpen={setOpen} />
          </span>
        )}
      </div>
    </>
  )
}

export default Footer
// This function is created to test something

// const handleClick = async (): Promise<void> => {
//   await testQuery()

//   if(data){
//     console.log('data', data)
//   }
//   else{
//     console.log(error?.message)
//   }
// }
