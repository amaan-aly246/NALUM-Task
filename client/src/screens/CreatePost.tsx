import React, { useState } from "react"
import { useNavigate } from "react-router"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GET_USER } from "@/graphql/Query/user.query"
import { useLazyQuery, useMutation } from "@apollo/client"
import { CREATE_POST } from "@/graphql/Mutation/post.mutation"
import { decodeToken } from "react-jwt"
function CreatePosts() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate()
  const [createPost, { loading: createPostLoading }] = useMutation(CREATE_POST)
  const [getUser, {}] = useLazyQuery(GET_USER)
  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    try {
      const token = localStorage.getItem("token")

      if (token) {
        const decoded = decodeToken<{
          email: string
          iat: number
          exp: number
        } | null>(token)
        const { name } = (
          await getUser({
            variables: { email: decoded?.email },
          })
        ).data.User
        const response = (
          await createPost({
            variables: {
              title,
              content,
              creator: name,
            },
          })
        ).data.createPost
        // console.log(response)
        if (response.success) {
          alert(response.message)
          navigate("/")
        }
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <form className="flex items-center flex-col " onSubmit={handleSubmit}>
      <h2 className=" font-semibold text-primary_red text-4xl mt-4">
        Create Post
      </h2>
      <Input
        className="w-3/5 my-2 lg:w-3/12"
        type="text"
        placeholder="Title"
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      {/*  @ts-ignore */}

      <ReactQuill
        theme="snow"
        value={content}
        onChange={(content: string) => setContent(content)}
        className="  h-48 lg:w-2/3 "
      />

      <Button
        type="submit"
        className="bg-primary_red hover:bg-secondary_red mt-20 w-3/4 lg:w-3/12">
        {createPostLoading ? "Creating..." : "Create Post"}
      </Button>
    </form>
  )
}

export default CreatePosts
