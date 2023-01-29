import { gql } from "@apollo/client";

export const MUTATE_CREATE_MESSAGE_CHAT = gql`
  mutation CreateMessage($input: InputCreateMessage) {
    createMessage(input: $input) {
      id
      message
    }
  }
`;

export const MUTATE_CREATE_CHAT = gql`
  mutation CreateChatByUser($input: InputCreateChatByUser) {
    createChatByUser(input: $input) {
      id
      usersId
    }
  }
`;
