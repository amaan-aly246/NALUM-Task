import { Document, model, Schema } from "mongoose"

export interface IPost extends Document {
  creatorId: string
  heading: string
  likes: number
  createdAt: Date
}

const PostSchema = new Schema<IPost>({
  creatorId: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const PostModel = model<IPost>("PostModel", PostSchema)
export default PostModel
