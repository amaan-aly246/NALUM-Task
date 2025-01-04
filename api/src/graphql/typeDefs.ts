export const schema = `#graphql
  
  type User {
    _id : ID!
    name : String!
    mail : String!
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
    createUser (mail : String!, password: String!  , name : String!): AuthResponse,
    loginUser(mail: String!, password: String!): AuthResponse
  }
`
