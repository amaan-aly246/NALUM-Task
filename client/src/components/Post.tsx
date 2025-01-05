import { PostType } from "@/types/types"
import { Heart } from "lucide-react"
import parse from "html-react-parser"
import TimeAgo from "react-timeago"

function Post(props: PostType) {
  return (
    <article className="bg-tertiary_color w-3/4 mx-10 mt-3 lg:w-2/4 lg:ml-72 ">
      <div className="bg-primary_red">
        <p>{props.creator} </p>
        <p>
          {/* @ts-ignore */}
          <TimeAgo date={props.createdAt} />
        </p>
      </div>
      <h3>{props.title} </h3>
      <section className="min-h-48 bg-yellow-300">
        {parse(props.content)}
      </section>
      <footer className="p-2">
        <button>
          <Heart color="#ff0f0f" className="" fill="#ff0f0f" />
        </button>
      </footer>
    </article>
  )
}

export default Post
