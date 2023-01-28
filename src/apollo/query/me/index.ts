import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me {
    me {
      age
      email
      id
      lastName
      name
    }
  }
`;
export default QUERY_ME;
