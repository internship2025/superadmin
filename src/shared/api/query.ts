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

export const FOLLOW_RELATIONS_FRAGMENT = gql`
  fragment FollowRelations on FollowPaginationModel {
    totalCount
    items {
      userId
      userName
      firstName
      createdAt
      lastName
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

export const GET_USER = gql`
  ${USER_FIELDS_FRAGMENT}
  query GetUser($id: Int!) {
    getUser(userId: $id) {
      ...UserFieldsFragment
      profile {
        id
        firstName
        lastName
        createdAt
        avatars {
          url
          width
          height
        }
      }
    }
  }
`;


export const GET_PAYMENTS_BY_USER = gql`
  query GetPaymentsByUser(
    $userId: Int!
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
    $pageSize: Int
  ) {
    getPaymentsByUser(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      userId: $userId
    ) {
      totalCount
      items {
        paymentType
        type
        price
        startDate
        endDate
        id
        payments {
          currency
        }
      }
    }
  }
`;

export const GET_FOLLOWERS = gql`
  ${FOLLOW_RELATIONS_FRAGMENT}
  query GetFollowers(
    $userId: Int!
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
    $pageSize: Int
  ) {
    getFollowers(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      userId: $userId
    ) {
      ...FollowRelations
    }
  }
`;

export const GET_FOLLOWING = gql`
  ${FOLLOW_RELATIONS_FRAGMENT}
  query GetFollowing(
    $userId: Int!
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
    $pageSize: Int
  ) {
    getFollowing(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      userId: $userId
    ) {
      ...FollowRelations
    }
  }
`;





export const GET_POSTS = gql`
  query GetPosts(
    $sortDirection: SortDirection
    $pageSize: Int
    $sortBy: String
    $searchTerm: String
    $endCursorPostId: Int
  ) {
    getPosts(
      pageSize: $pageSize
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortDirection: $sortDirection
      endCursorPostId: $endCursorPostId
    ) {
  
   totalCount
   items{
    id
    images{
      url
      width
      height
      id
    }
   }
    }
  }
`;