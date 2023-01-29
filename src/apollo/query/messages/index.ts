import { gql } from "@apollo/client";

export const QUERY_LIST_MESSAGES_BY_CHAT = gql`
  query ListMessagesByChatUser($filter: InputFilterListMessagesByChat) {
    listMessagesByChatUser(filter: $filter) {
      totalCount
      pageInfo {
        hasPreviousPage
        hasNextPage
      }
      items {
        conversationId
        createdAt
        id
        user {
          id
          email
          fullName
          image
          lastName
          name
        }
        message
        userId
      }
    }
  }
`;
