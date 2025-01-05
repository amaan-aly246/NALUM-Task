import { Document, model, Schema } from "mongoose"

export interface IPost extends Document {
  creator: string
  title: string
  content : string,
  likes: number
  createdAt: Date
}

const PostSchema = new Schema<IPost>(
  {
    creator: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content :{
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const PostModel = model<IPost>("Post", PostSchema)
export default PostModel
