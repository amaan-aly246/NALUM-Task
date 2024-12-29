export const schema = `#graphql
  
  type User {
    _id : ID!
    name : String!
    age : Int!
  }
  type Query{
    Users : [User]
  }

`
