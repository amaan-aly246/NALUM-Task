import { gql } from "@apollo/client"

export const GET_USERS = gql`
  query Query {
    Users {
      name
      _id
      mail
    }
  }
`
// export const LOGIN_USER = gql``
