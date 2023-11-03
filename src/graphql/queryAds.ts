import { gql } from "@apollo/client";

export const GET_ADS = gql`
  query GetAds($where: AdsWhere) {
    getAds(where: $where) {
      id
      title
      owner
      description
      location
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
