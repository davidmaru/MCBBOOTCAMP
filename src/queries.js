import { gql } from '@apollo/client';

export const GET_USERS = gql`
query GetUsers {
users {
    id
    name
    age
    address
    phone_number
}}`;
export const GET_USER_BY_ID = gql`
query userById($id:Int!){
    userById(id: $id) {
      address
      age
      id
      name
      phone_number
    }
  }
`;
