/* eslint-disable no-unreachable */
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../queries';
import { Box, Button,useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link } from'react-router-dom';


const Users = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {loading, error, data}=useQuery(GET_USERS);
    
    if(loading) return <p> Loading...</p>;
    if(error) return <p>{error.message}</p>;
        const columns = [
          { field: "id", headerName: "ID" ,
            renderCell: (params) =>(<div>{params.value}</div>)
          },
          {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: (params) =>(<div>{params.value}</div>)
          },
          {
            field: "age",
            headerName: "Age",
            type: "number",
            headerAlign: "left",
            align: "left",
            renderCell: (params) =>(<div>{params.value}</div>)
          },
          {
            field: "address",
            headerName: "Address",
            flex: 1,
            renderCell: (params) =>(<div>{params.value}</div>)
          },
          {
            field: "phone_number",
            headerName: "Phone_Number",
            flex: 1,
            renderCell: (params) =>(<div>{params.value}</div>) 
          },
          {
            field: "edituser",
            headerName: "Edit User",
            flex: 1,
            renderCell: (params) => (
                <Link  to= {`/edit-User/${params.id}`}>
                <Box>
                <Button
                  sx={{
                    backgroundColor: colors.greenAccent[700],
                    color: colors.grey[100],
                    fontSize: "12px",
                    padding: "10px 20px",
                  }}
                >
                  Edit
                </Button>
              </Box>
              </Link>
              ),
            },
        ];
        const rows = data.users.map((user) => ({
          id:user.id,
          name:user.name,
          address: user.address,
          age: user.age,
          phone_number: user.phone_number,
          
        }));
      
        return (
          <Box m="20px">
            <Header title="USERS" subtitle="Managing the Users" />
            <Box
              m="40px 0 0 0"
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
              }}
            >
              <DataGrid  rows={rows} columns={columns} />
            </Box>
          </Box>
        );
      };
      
      export default Users;
      