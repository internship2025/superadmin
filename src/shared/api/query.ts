import { gql } from "@apollo/client";

export const USER_FIELDS_FRAGMENT = gql`
  fragment UserFieldsFragment on User {
    userName
    id
    email
    createdAt
    userBan {
      reason
      createdAt
    }
  }
`;
