import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BasicTable from "../../components/table/CustomTable";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TableRowsIcon from "@mui/icons-material/TableRows";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BasicModal from "../../components/modal/AddProjectModal";
import AddProjectForm from "../../components/form/AddProjectForm";
import { Alert, Modal, Snackbar } from "@mui/material";
import axiosInstance from "../../config/axiosConfig";
function Project() {
  const [isCard, setIscard] = useState(false);
  const [Data, setData] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEdit(false);
  const [tableData, setTableData] = useState([]);
  const viewChange = () => {
    if (isCard === false) {
      setIscard(true);
    } else {
      setIscard(false);
    }
  };
  const [apiResp, setApiResp] = useState({
    message: "",
    status: false,
    error: false,
  });
  const getAllProjects = () => {
    axiosInstance
      .get("/project")
      .then((res) => {
        console.log(res.data);
        setTableData(res?.data);

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

  const handleDeleteProjects = (id) => {
    axiosInstance
      .delete(`/project/${id}`)
      .then((res) => {
        setApiResp({
          message: "Deletion Success",
          status: true,
          error: false,
        });
        getAllProjects();
        setTimeout(() => {
          setApiResp(
            {
              message: "",
              status: false,
              error: false,
            }
          )
          
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setApiResp({
          message: err.response.data.message,
          status: true,
          error: true,
        });
      });
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const handleAllModelClosing = (value) => {
    console.log(value);
    if (value) {
      setOpen(false);
      setEdit(false);
      getAllProjects();
    }
  };
  return (
    <div>
      <div className="col-12 d-flex p-head1 px-2 rounded">
        {" "}
        Projects{" "}
        <AddCircleIcon
          fontSize="100px"
          onClick={() => {
            handleOpen();
          }}
          className="mt-2 mx-2 add-icon"
        />
      </div>

      {/* ---------card setup--------------------- */}

      <div className="row mt-2 shadow-lg d-flex">
        {tableData?.length &&
          tableData?.map((item, index) => {
            return (
              <div
                key={index}
                className="col-lg-4 card my-4 py-3 shadow-sm rounded"
                style={{ backgroundColor: "#0dbef93d" }}
              >
                <div className="col-12 mt-3 d-flex justify-content-center">
                  {" "}
                  <span className="p-head3">{item?.name}</span>
                </div>
                <div className="col-12 mt-3 d-flex justify-content-center">
                  {" "}
                  <span className="p-head5">Members</span>
                </div>

                {item?.members &&
                  item?.members?.map((item1, index1) => {
                    return (
                      <div
                        key={index1}
                        className="col-12 mt-1 d-flex justify-content-center"
                      >
                        {" "}
                        <span className="p-head6 mx-2">
                          {item1?.name}
                        </span> :{" "}
                        <span className="p-head6 mx-2">{item1?.desc}</span>
                      </div>
                    );
                  })}

                <div className="col-12 mt-3 d-flex justify-content-center">
                  {" "}
                  <span className="p-head5">{item?.status}</span>
                </div>

                <div className="col-12 mt-4 d-flex justify-content-center">
                  {" "}
                  <span
                    className="p-head6 mx-2 "
                    onClick={() => {
                      setEdit(true);
                      setId(item?._id);
                    }}
                  >
                    <ModeEditOutlineIcon />
                  </span>{" "}
                  <span
                    className="p-head6 mx-2"
                    onClick={() => handleDeleteProjects(item?._id)}
                  >
                    <DeleteForeverIcon />
                  </span>
                </div>
              </div>
            );
          })}
      </div>

      <Modal open={open} onClose={handleClose}>
        <AddProjectForm modelClose={handleAllModelClosing} />
      </Modal>

      <Modal open={edit} onClose={handleEditClose}>
        <AddProjectForm id={id} modelClose={handleAllModelClosing} />
      </Modal>
      <Snackbar
        open={apiResp?.status}
        autoHideDuration={3000}
        onClose={() => {
          setTimeout(() => {
            setApiResp({
              message: "",
              status: fasle,
              error: false,
            });
          }, 2000);
        }}
      >
        <Alert
          onClose={() => {
            setApiResp({
              message: "",
              status: fasle,
              error: false,
            });
          }}
          severity={apiResp?.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {apiResp?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Project;
