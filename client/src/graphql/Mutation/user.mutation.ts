import { gql } from "@apollo/client"

export const CREATE_USER = gql`
  mutation CreateUser($mail: String!, $password: String!, $name: String!) {
    createUser(mail: $mail, password: $password, name: $name)
  }
`
