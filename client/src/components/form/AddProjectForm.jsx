import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import axiosInstance from "../../config/axiosConfig";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from '@mui/icons-material/Delete';
const AddProjectForm = ({id,modelClose}) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberDesc, setMemberDesc] = useState("");
  const initialData = {
    name: "",
    desc: "",
    _id: "1",
  };
  const [apiResp, setApiResp] = useState({
    message: "",
    status: false,
    error: false,
  });
  const [members, setMembers] = useState([initialData]);
  const handleModelCLose = ()=>{
    modelClose('fasle')
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("userId");
    const membersWithoutId = members.map(({ _id, ...rest }) => rest);

    const newProject = {
      name: name,
      status: status,
      userId: uid,
      members: membersWithoutId,
    };

    axiosInstance
      .post("project", newProject)
      .then((response) => {
        console.log(response.data);

        setApiResp({
          message: " Created",
          status: true,
          error: false,
        });
        setTimeout(() => {
          handleModelCLose()
        }, 1000);    

        
      })
      .catch((error) => {
        console.error("Error adding project:", error);
        setApiResp({
          message: err.response.data.message,
          status: true,
          error: true,
        });
      });

    console.log("Submitted project:", newProject);
    setName("");
    setStatus("active");
    setUserId("");
    setMembers([]);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("userId");
    const membersWithoutId = members.map(({ _id, ...rest }) => rest);

    const newProject = {
      name: name,
      status: status,
      userId: uid,
      members: membersWithoutId,
    };

    axiosInstance
      .patch(`project/${id}`, newProject)
      .then((response) => {
        console.log(response.data);
        setApiResp({
          message: " Updated",
          status: true,
          error: false,
        });
        setTimeout(() => {
          handleModelCLose()
        }, 1000);    
      })
      .catch((error) => {
        console.error("Error adding project:", error);
        setApiResp({
          message: err.response.data.message,
          status: true,
          error: true,
        });
      });

    console.log("Submitted project:", newProject);
    setName("");
    setStatus("active");
    setUserId("");
    setMembers([]);
  };

  const handleAddMember = () => {
    const newMember = {
      _id: uuidv4(),

      name: "",
      desc: "",
    };
    setMembers([...members, newMember]);
  };
  const handleDeleteMember = (id) => {
    setMembers(members.filter(member => member._id !== id));
  };
  const handleChangeMenmberName = (id, value) => {
    const updatedMembers = members.map((member) =>
      member._id === id ? { ...member, name: value } : member
    );
    setMembers(updatedMembers);
  };
  const handleChangeMenmberDesc = (id, value) => {
    const updatedMembers = members.map((member) =>
      member._id === id ? { ...member, desc: value } : member
    );
    setMembers(updatedMembers);
  };

  const getSingleProject = (id)=>{
    axiosInstance.get(`/project/${id}`)
     .then((response) => {
        console.log(response.data);
        setName(response.data.name);
        setStatus(response.data.status);
        setUserId(response.data.userId);
        setMembers(response.data.members);
      })
     .catch((error) => {
        console.error("Error getting project:", error);
      });
  }

  useEffect(()=>{
getSingleProject(id)
  },[id])



  return (
    <Container
      component={Paper}
      elevation={3}
      maxWidth="md"
      sx={{ p: 4, mt: 4 }}
    >
      <Typography variant="h5" gutterBottom>
        
      {!id ? 'Add Project' : 'Edit Project'}
      </Typography>
      <form onSubmit={(e)=>{
        !id? handleSubmit(e):handleEditSubmit(e)
      }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Project Name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
           <Grid item xs={12}>
      <TextField
        select
        label="Status"
        fullWidth
        variant="outlined"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      >
        {["active", "inactive", "completed"].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Grid>

          <Grid item xs={12}>
            

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Action</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {members?.length &&
                  members?.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell width={"40%"}>
                          <TextField
                            label="Member Name"
                            fullWidth
                            variant="outlined"
                            value={item?.name}
                            onChange={(e) =>
                              handleChangeMenmberName(
                                item?._id,
                                e?.target?.value
                              )
                            }
                            //   required
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            label="Member Name"
                            fullWidth
                            variant="outlined"
                            value={item?.desc}
                            onChange={(e) =>
                              handleChangeMenmberDesc(
                                item?._id,
                                e?.target?.value
                              )
                            }
                            //   required
                          />
                        </TableCell>
                        <TableCell align="center"><DeleteIcon onClick={()=>handleDeleteMember(item?._id)}/></TableCell>

                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMember}
              sx={{ mt: 2 }}
            >
              Add Member
            </Button>
          </Grid>
          {/* Optionally, display added members */}
          {/* {members.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Added Members:
              </Typography>
              <ul>
                {members.map((member, index) => (
                  <li key={index}>{`${member.name} - ${member.desc}`}</li>
                ))}
              </ul>
            </Grid>
          )} */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Project
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={apiResp?.status}
        autoHideDuration={3000}
        onClose={() => {}}
      >
        <Alert
          onClose={() => {}}
          severity={apiResp?.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {apiResp?.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddProjectForm;
