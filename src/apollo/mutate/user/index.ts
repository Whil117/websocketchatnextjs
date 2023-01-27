import { gql } from "@apollo/client";

export const MUTATE_CREATE_USER = gql`
  mutation CreateUser($input: InputCreateUser) {
    createUser(input: $input) {
      token
      user {
        age
        email
        id
        lastName
        name
      }
    }
  }
`;
