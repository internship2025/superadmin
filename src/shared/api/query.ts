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

export const GET_USERS = gql`
  ${USER_FIELDS_FRAGMENT}
  query GetUsers(
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
    $searchTerm: String
    $statusFilter: UserBlockStatus
  ) {
    getUsers(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
      statusFilter: $statusFilter
    ) {
      users {
        ...UserFieldsFragment
      }
      pagination {
        pagesCount
        page
        pageSize
        totalCount
      }
    }
  }
`;
