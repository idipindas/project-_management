import {
  Alert,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import CustomInput from "../input/CustomInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axiosInstance from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

function SignupCard() {
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [apiResp, setApiResp] = useState({
    message: "",
    status: false,
    error: false,
  });


  const handleSignUp =  ()=>{
    axiosInstance.post('/user/signup',{name,email,password})
    .then((res)=>{
      console.log(res.data)
      const token = res.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", res?.data?._id);

      setApiResp({
        message: "Registration Success",
        status: true,
        error: false,
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);    })
    .catch((err)=>{
      console.log(err)
      setApiResp({
        message: err.response.data.message,
        status: true,
        error: true,
      });
    })
  }

  return (
    <div className="login-card">
      <Card
        variant="elevation"
        sx={{ background: "#ffffffd6" }}
        className="py-4 px-3"
        style={{ borderRadius: "15px" }}
      >
        <CardContent className="my-4 ">
          <div className="row mb-4 d-flex text-center">
            <h1>Sign Up</h1>
          </div>
          <CustomInput placeholder={"Name"} className='mb-3' onChange={(e)=>setName(e?.target?.value)}/>

          <CustomInput placeholder={"Email"} onChange={(e)=>setEmail(e?.target?.value)} />
          <FormControl fullWidth variant="outlined" className="mt-3">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
            onChange={(e)=>setPassword(e?.target?.value)}
              fullWidth
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <div className="row d-flex justify-content-center">
            <Button
            onClick={handleSignUp}
              variant="outlined"
              className=" mt-4"
              sx={{
                width: "90%",
                color: "white",
                backgroundColor: "#2cb12ccf",
                borderRadius: "15px",
              }}
            >
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
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
    </div>
  );
}

export default SignupCard;
