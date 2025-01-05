export const schema = `#graphql
  
  type User {
    name : String!
    email : String!
  }

  type AuthResponse {
    success: Boolean!,
    token: String,
    message: String!,
  }

  type Post {
    creator: String!,
    title: String!,
    content: String!,
    likes: Int,
    createdAt: String
  }
  type GetAllPostsResponse {
    postsData : [Post]!,
    success: Boolean!,
    message: String!
  }
  type CreatePostResponse {
    success: Boolean!
    message: String!
  }
  type Query{
    Users : [User]
    User (email: String!): User
    Posts: GetAllPostsResponse
    Test: String  #for testing purposes 
  }

  type Mutation {
    createUser (email : String!, password: String!  , name : String!): AuthResponse,
    loginUser(email: String!, password: String!): AuthResponse,
    createPost(creator: String!, title: String!, content: String!) : CreatePostResponse 
  }
`
