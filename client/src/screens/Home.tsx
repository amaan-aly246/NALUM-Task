import { GET_ALL_POST } from "@/graphql/Query/post.query"
import { useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import Post from "../components/Post"
import { PostType } from "@/types/types"
function Home() {
  const [getAllPosts, { loading: getAllPostsLoading }] =
    useLazyQuery(GET_ALL_POST)
  const [postsData, setPostsData] = useState<PostType[]>([])

  useEffect(() => {
    const handleGetAllPosts = async (): Promise<void> => {
      try {
        const response = (await getAllPosts()).data.Posts
        setPostsData(response.postsData)
        // console.log(response.postsData)
      } catch (error: any) {
        console.error(error?.message)
      }
    }

    handleGetAllPosts()
  }, [getAllPosts])
  if (getAllPostsLoading) {
    return (
      <p className="flex items-center justify-center font-semibold text-primary_red h-screen text-4xl">
        Data is loading...{" "}
      </p>
    )
  }
  return (
    <div>
      {postsData.length > 0 ? (
        postsData.map((post, index) => <Post key={index} {...post} />)
      ) : (
        <p className="flex items-center justify-center font-semibold text-primary_red h-screen text-4xl">
          No Posts :|
        </p>
      )}
    </div>
  )
}

export default Home
