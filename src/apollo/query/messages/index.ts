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
        message
        conversationId
        userId
        user {
          name
        }
        id
        createdAt
      }
    }
  }
`;
