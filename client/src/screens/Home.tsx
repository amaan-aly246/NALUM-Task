import { GET_USERS } from "@/graphql/Query/user.query"
import { useQuery } from "@apollo/client"

function Home() {
  const { loading, error, data } = useQuery(GET_USERS)

  if (error) {
    return <div>{`Error: ${error.message}`}</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1>This is the home page</h1>
      <ul>
        {data.Users.map(
          (user: { mail: string; name: string ,}, index: number) => (
            <div key={index}>
              <li>{user.mail}</li>
              <li>{user.name}</li>
            </div>
          )
        )}
      </ul>
    </div>
  )
}

export default Home
