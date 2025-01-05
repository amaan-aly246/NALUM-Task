import { Home, BadgePlus, User as UserIcon } from "lucide-react"
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
    {/* color="#7981ec" */}
      <div className="bg-tertiary_color  fixed bottom-0 left-0 right-0 flex justify-around p-3 cursor-pointer text-primary_red">
        <span>
          <Link to="/">
            <Home  />
          </Link>
        </span>
        <span
          onClick={() => {
            console.log("create")
            user ? navigate("/create") : setOpen(true)
          }}>
          <BadgePlus />
        </span>

        {user ? (
          <Link to="/profile">
            <UserIcon  />
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
