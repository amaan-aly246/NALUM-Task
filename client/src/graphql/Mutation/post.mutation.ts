import { gql } from "@apollo/client"

export const CREATE_POST = gql`
  mutation createPost($content: String!, $title: String!, $creator: String!) {
    createPost(content: $content, title: $title, creator: $creator) {
      message
      success
    }
  }
`
