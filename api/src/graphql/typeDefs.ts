export const schema = `#graphql
  
  type User {
    _id : ID!
    name : String!
    email : String!
  }

  type AuthResponse {
    success: Boolean!,
    token: String,
    message: String!,
  }
  type Query{
    Users : [User]
  }
  type Mutation {
    createUser (email : String!, password: String!  , name : String!): AuthResponse,
    loginUser(email: String!, password: String!): AuthResponse
  }
`
