import { gql } from "@apollo/client";

export const SUBSCRIBE_MESSAGE_CHAT = gql`
  subscription Subscription($input: InputSubscript) {
    postCreated(input: $input) {
      userId
      user {
        name
        lastName
        image
        id
        fullName
        age
      }
      message
      id
      conversationId
      createdAt
    }
  }
`;
