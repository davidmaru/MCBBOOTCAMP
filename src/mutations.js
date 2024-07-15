import { gql} from '@apollo/client';

export const ADD_USERS = gql`
mutation ($addUsers: UsersInput!) {
  saveUsers(newUsers:$addUsers) {
    id
    name
    age
    address
    phone_number
  }
}
`;

export const UPDATE_USERS = gql`
mutation ($updateUsers:UsersInput!){
  updateUsers(updateUsers:$updateUsers){
    id
    name
    age
    address
    phone_number
  }

  }
`;

export const DELETE_USERS = gql` 
mutation($id:Int!){
  deleteUsers(id:$id)
}
`; 
