import { gql } from "@apollo/client";

export const GET_AD = gql`
  query GetAdById($id: ID!) {
    getAdById(id: $id) {
      id
      title
      description
      location
      owner
      picture
      price
      createdAt
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;
