import { gql } from "@apollo/client";

export const CREATE_AD = gql`
  mutation Mutation($data: AdCreateInput!) {
    createAd(data: $data) {
      id
      title
      description
      location
      owner
      picture
      price
      category {
        id
      }
      tags {
        id
      }
    }
  }
`;
