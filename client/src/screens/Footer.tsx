import { Home, BadgePlus } from "lucide-react"

import { Link } from "react-router"
import Login from "../components/AuthModel"
import { TEST_QUERY } from "@/graphql/Query/user.query"
import { useLazyQuery } from "@apollo/client"
function Footer() {
  const [testQuery, { data, error }] = useLazyQuery(TEST_QUERY)
  const handleClick = async (): Promise<void> => {
    await testQuery()

    if(data){
      console.log('data', data)
    }
    else{
      console.log(error?.message)
    }
  }
  return (
    <>
      <div className="bg-fuchsia-200  fixed bottom-0 left-0 right-0 flex justify-around p-3 cursor-pointer">
        <span>
          <Link to="/">
            <Home color="#7981ec" />
          </Link>
        </span>
        <span>
          {/* <Link to="/create">
            <BadgePlus color="#7981ec" />
          </Link> */}
          <BadgePlus color="#7981ec" onClick={handleClick} />
        </span>
        <span>
          <Login />
        </span>
      </div>
    </>
  )
}

export default Footer
