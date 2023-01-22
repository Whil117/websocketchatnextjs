import { gql } from "@apollo/client";

export const SUBSCRIBE_MESSAGE_CHAT = gql`
  subscription Subscription($input: InputSubscript) {
    postCreated(input: $input) {
      userId
      user {
        name
        lastName
        id
        age
      }
      message
      id
      conversationId
    }
  }
`;
