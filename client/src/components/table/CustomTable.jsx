import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import PageviewIcon from '@mui/icons-material/Pageview';
import axiosInstance from "../../config/axiosConfig";
import { useState } from "react";
import { useEffect } from "react";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function BasicTable({ columns }) {
  const [data,setData] = useState()
  const testColumns = [
    {
      title: "Sl No",
      align: "center",
      width: 10 ,
    },
    {
      title: "Project Name",
      align: "center",
    },
    {
      title: "Status",
      align: "center",
    },
    {
      title: "Start Date",
      align: "center",
    },
    {
        title: "Action",
        align: "center",
      },
  ];


  const handleDeleteProjects = (id) => {
    axiosInstance
      .delete(`/project/${id}`)
      .then((res) => {
        getAllProjects();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllProjects = () => {
    axiosInstance
      .get("/project")
      .then((res) => {
        console.log(res.data);

        const tableData =
          res?.data?.length &&
          res?.data?.map((item, index) => {
            return {
              _id: item?._id,
              projectName: item?.name,
              status: item?.status,
              date: item?.createdAt,
            };
          });
        setData(tableData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(()=>{
  getAllProjects()
  },[])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {testColumns?.length &&
              testColumns?.map((item, index) => {
                return (
                  <TableCell width={item?.width} key={index} style={{ fontSize:'17px',fontWeight:600}} align={item.align}>
                    {item.title}
                  </TableCell>
                );
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length&&data.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align={row?.align?row?.align:'center'}>{row?.projectName}</TableCell>
              <TableCell align={row?.align?row?.align:'center'} >{row?.status}</TableCell>
              <TableCell align={row?.align?row?.align:'center'} >{row?.date}</TableCell>
              <TableCell align={'center'} > <div className="">
                <ModeEditOutlineIcon className="mx-1"/>
                <PageviewIcon className="mx-1"/>
                <DeleteForeverIcon onClick={()=>{
                  console.log('i',row);
                  handleDeleteProjects(row?._id)}} className="mx-1"/>


              </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
