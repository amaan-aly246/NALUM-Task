import { gql } from "@apollo/client"

export const GET_USERS = gql`
  query getAllUsers {
    Users {
      name
      _id
      mail
    }
  }
`

export const TEST_QUERY = gql`
  query testQuery {
    Test
  }
`
export const GET_USER = gql`
  query getUser($email: String!) {
    User(email: $email) {
      email
      name
    }
  }
`
