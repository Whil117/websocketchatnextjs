import { gql } from "@apollo/client";

export const MUTATE_CREATE_MESSAGE_CHAT = gql`
  mutation CreateMessage($input: InputCreateMessage) {
    createMessage(input: $input) {
      id
      message
    }
  }
`;
