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
