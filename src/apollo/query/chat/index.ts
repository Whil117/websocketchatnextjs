import { gql } from "@apollo/client";

export const QUERY_LIST_CHAT_BY_USER = gql`
  query ListChatByUser($filter: InputFilterListChatUsers) {
    listChatByUser(filter: $filter) {
      totalCount
      items {
        id
        usersId
        user {
          fullName
          id
          image
          name
          lastName
          email
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;

export const QUERY_CHAT_CONVERSATION_ID = gql`
  query ChatByIdConversation($filter: FilterChatByIdConversation) {
    chatByIdConversation(filter: $filter) {
      id
      user {
        email
        image
        fullName
        age
        name
        lastName
        id
      }
      usersId
    }
  }
`;
