import { gql } from "@apollo/client"

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!, $name: String!) {
    createUser(email: $email, password: $password, name: $name){
      token 
      success
      message
    }
  }
`

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      success
      message
    }
  }
`
