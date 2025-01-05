import React, { useState } from "react"
import { Navigate } from "react-router"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function CreatePosts() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [redirect, setRedirect] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Post created:", { title, content })
    setRedirect(true)
  }

  if (redirect) return <Navigate to="/" />
  return (
    <form className="flex items-center flex-col " onSubmit={handleSubmit}>
      <h2 className=" font-semibold text-primary_red text-4xl mt-4">
        Create Post
      </h2>
      <Input
        className="w-3/5 my-2"
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
        className="  h-48 "
      />

      <Button
        type="submit"
        className="bg-primary_red hover:bg-secondary_red mt-20 w-3/4">
        Create Post
      </Button>
    </form>
  )
}

export default CreatePosts
