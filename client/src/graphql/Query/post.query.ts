import { gql } from "@apollo/client"

export const GET_ALL_POST = gql`
  query getAllPosts {
    Posts {
      message
      postsData {
        title
        likes
        creator
        content
        createdAt
      }
      success
    }
  }
`
