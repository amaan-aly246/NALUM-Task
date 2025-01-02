export const schema = `#graphql
  
  type User {
    _id : ID!
    name : String!
    mail : String!
  }

  type LoginResponse {
    success: Boolean!,
    token: String,
    message: String,
  }
  type Query{
    Users : [User]
  }
  type Mutation {
    createUser (mail : String!, password: String!  , name : String!): String,
    loginUser(mail: String!, password: String!): LoginResponse
  }
`
