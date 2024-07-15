import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { ADD_USERS, UPDATE_USERS } from "../../mutations";
import { useState } from "react";
import Users from "../Users";
import { useMutation } from '@apollo/client';
import { GET_USERS } from "../../queries";


const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const[id]=useState(0);
  const [name, setName]= useState('');
  const [address, setAddress]= useState('');
  const [age, setAge]= useState();
  const [phone_number, setPhone_number]= useState('');
  const [saveUsers, { data, loading, error}] = useMutation(ADD_USERS, 
    {
      refetchQueries: [
        {query: GET_USERS},
      ],
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    saveUsers({ variables: {addUsers: {id: id,name: name, address: address, age:  parseInt(age), phone_number: phone_number}}});
};
  
  
  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Box>
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone_Number"
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box onClick={handleSubmit}display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form> 
          {loading && <p> Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data &&  <p key= {Users.id} display="flex" justifyContent="end" mt="20px" >User Created: {data.saveUsers.name + '' + data.saveUsers.address + '' + data.saveUsers.age + '' + data.saveUsers.phone_number}</p>}
      
      </Box>
    </Box>
  );

};
export const Edit = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const[id]=useState(0);
  const [name, setName]= useState('');
  const [address, setAddress]= useState('');
  const [age, setAge]= useState();
  const [phone_number, setPhone_number]= useState('');
  const [updateUsers, { data, loading, error}] = useMutation(UPDATE_USERS);
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUsers({ variables: {addUsers: {id: id,name: name, address: address, age:  parseInt(age), phone_number: phone_number}}});
};
  
  
  return (
    <Box m="20px">
      <Header title="EDIT USER" subtitle="Edit  User Profile" />

      <Box id="id1">
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone_Number"
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box onClick={handleSubmit}display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Edit User
              </Button>
            </Box>
          </form> 
          {loading && <p> Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data &&  <p key= {Users.id} display="flex" justifyContent="end" mt="20px" >USER ADDED!: {data.updateUsers.name + '' + data.updateUsers.address + '' + data.updateUsers.age + '' + data.updateUsers.phone_number}</p>}
      
      </Box>
      <Box id= "id2"></Box>
    </Box>
  );

};


export default Form;