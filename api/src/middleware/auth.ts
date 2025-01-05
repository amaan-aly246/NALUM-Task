import jwt from "jsonwebtoken"
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "SECRET_KEY"
import { GraphQLError } from "graphql"
export const authMiddleware = async (
  resolve: any,
  parent: any,
  args: any,
  context: any
) => {
  console.log("authMiddleware middleware function is called")

  const { req } = context // Extract req from context
  const authHeader = req.headers.authorization
   console.log('authToken ' , authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new GraphQLError("Unauthorized: Missing or invalid token", {
      extensions: {
        code: "UNAUTHORIZED",
        http: { status: 401 },
      },
    })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, accessTokenSecret)
    console.log("context.user", context.user)
    console.log("decoded", decoded)
    context = decoded // Attach user info to context
  } catch (err) {
    throw new Error("Invalid or expired token")
  }

  // Call the next resolver
  return resolve(parent, args, context)
}
