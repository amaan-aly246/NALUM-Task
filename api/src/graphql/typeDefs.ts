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
  type Query{
    Users : [User]
    User (email: String!): User
    #for testing purposes 
    Test: String 
  }

  type Mutation {
    createUser (email : String!, password: String!  , name : String!): AuthResponse,
    loginUser(email: String!, password: String!): AuthResponse
  }
`
