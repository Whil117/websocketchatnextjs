import { gql } from "@apollo/client";

export const QUERY_LIST_USERS = gql`
  query ListUsers($input: InputFilterListUsers) {
    listUsers(input: $input) {
      totalCount
      pageInfo {
        hasPreviousPage
        hasNextPage
      }
      items {
        age
        email
        fullName
        id
        lastName
        name
      }
    }
  }
`;
