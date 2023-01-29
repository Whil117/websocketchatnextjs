import { gql } from "@apollo/client";

export const MUTATE_CREATE_USER = gql`
  mutation CreateUser($input: InputCreateUser) {
    createUser(input: $input) {
      token
      user {
        name
        lastName
        id
        fullName
        image
        email
        age
      }
    }
  }
`;

export const MUTATE_LOGIN_USER = gql`
  mutation LoginUser($input: InputLoginUser) {
    loginUser(input: $input) {
      user {
        name
        lastName
        id
        fullName
        image
        email
        age
      }
      token
    }
  }
`;
