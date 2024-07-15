import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { UPDATE_USERS, DELETE_USERS} from "../../mutations";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from "../../queries";
import { useParams, useNavigate } from "react-router-dom";


const Edit = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } =useParams();
  const navigate = useNavigate();
  const intId = parseInt(id);
  const { loading, error, data} = useQuery(GET_USER_BY_ID, {variables:{id: intId}});
  const [deleteUsers] = useMutation(DELETE_USERS);
  const [formData, setFormData]= useState({
    name: '',
    address: '',
    age: 0,
    phone_number: '',
  });
  useEffect(() => {
    if(data && data.userById){
      console.log('User data:', data.userById);
      setFormData({
        name: data.userById.name ,
        address: data.userById.address,
        age: data.userById.age ,
        phone_number: data.userById.phone_number
      });
    }
  }, [data]);

  const [updateUsers] = useMutation(UPDATE_USERS, {variables: {updateUsers:{
    id: intId, 
    name: formData.name, 
    address: formData.address,
   age: parseInt(formData.age),
  phone_number: formData.phone_number}}} );

  function handleChange (e, name = '') {
    console.log( "HELLO WORLD" ); 
    const { value} = e.target;
    console.log( name);
    setFormData({...formData, [name]: value});
    

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/User/:id');

    if (!formData.name)
      {alert('Name Is Empty');
        return;
      }
    try{
      const response = await
    updateUsers({ variables: {
      id: intId, 
      name: formData.name, 
      address: formData.address,
     age: parseInt(formData.age),
    phone_number: formData.phone_number}});

    console.Write('UPDATE SUCCESS!');

    console.log('Update response:', response);
    } catch(err)
    {console.error('Error On User Update', err);}
  };
  const handleDelete = async () => {
  try{
  const response = await deleteUsers({ variables: { id: intId}});
  console.log('Delete response:', response);
  window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS LOYAL USER?');

  navigate('/User/:id');
} catch (err) {
  console.error('Delete Not Succesfull', err);
}};

  if(loading) return <p> Loading...</p>;
  if(error) return <p> Error {error.message}</p>;
  
  
  return (
    <Box m="20px">
      <Header title="EDIT USER" subtitle="Edit User Details" />

      <Box>
          <div>
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
            label="ID"
            value={intId}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                value={formData.name}
                onChange={(e) => handleChange (e, "name")}
                sx={{ gridColumn: "span 2" }}
              />
        
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Age"
                value={formData.age}
                onChange={(e) => handleChange (e, "age")}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone_Number"
                value={formData.phone_number}
                onChange={(e) => handleChange(e, "phone_number")}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                value={formData.address}
                onChange={(e) => handleChange(e, "address")}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box onClick={handleSubmit}display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                EDIT USER
              </Button>
            </Box>
            <Box onClick={handleDelete}display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="error" variant="contained" font="Bold">
                DELETE USER
              </Button>
            </Box>
          </div> 
      </Box>
    </Box>
  );

};

export default Edit;