import { gql } from "@apollo/client";

export const GET_ADS = gql`
  query GetAds($skip: Int, $take: Int, $where: AdsWhere) {
    getAds(skip: $skip, take: $take, where: $where) {
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
    allAdsCount(where: $where)
  }
`;
