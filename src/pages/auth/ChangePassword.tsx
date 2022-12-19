import React, { useState, useContext } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
// import axios from "axios";
// @ts-ignore
import { AuthContext } from "../../context/AuthContext";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //@ts-ignore
  const { app_auth } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const [password2, setPassword2] = useState<string>("");
  const [showPassword3, setShowPassword3] = useState<boolean>(false);
  const [password3, setPassword3] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleClickShowPassword3 = () => {
    setShowPassword3(!showPassword3);
  };

  const sendData = async (postData: any) => {
    let url = "/profile/doc/changePassword";
    console.log("url", url);

    const res = await axios({
      method: "post",
      url: url,
      data: postData,
      headers: {
        Authorization: `Bearer ${app_auth.token}`,
      },
    });
    console.log("res", res);

    return res;
  };

  const mutation = useMutation(sendData, {
    onSuccess: (data, variable, context) => {
      console.log("success", data, variable, context);
      enqueueSnackbar(data.data.message, {
        variant: "success", 
      });
      setPassword('')
      setPassword2('')
      setPassword3('')
    },
    onError: (err: any, variables, context) => {
      console.log("err", err.response.data.message, variables, context);
      enqueueSnackbar(err.response.data.message, {
        variant: "error",
      });
    },
  });

  const handleContinue = async (e: any) => {
    e.preventDefault();

    let postData = {
      currentPass: password,
      newPass: password2,
      confirmNewPass: password3,
    };
    mutation.mutate(postData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "85vh",
        backgroundSize: "cover",
      }}
    >
      <form onSubmit={handleContinue}>
        <Box
          sx={{
            // height: "400px",
            maxWidth: "400px",
            // display: "flex",
            boxShadow: "1px 1px 20px 0px #ddd",
            background: "rgba(255,255,255,0.9)",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ flex: 1, marginLeft: 0, padding: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 500, color: "#29335C" }}>
              Change Password
            </Typography>

            <Box mt={3}>
              <TextField
                fullWidth
                placeholder="Current Password"
                // required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Box>

            <Box mt={3}>
              <TextField
                fullWidth
                placeholder="New Password"
                // required
                type={showPassword2 ? "text" : "password"}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        // onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword2 ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Box>

            <Box mt={3}>
              <TextField
                fullWidth
                placeholder="Confirm Password"
                // required
                type={showPassword3 ? "text" : "password"}
                value={password3}
                onChange={(e) => setPassword3(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword3}
                        // onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword3 ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Box>
            <Box mt={3} sx={{ textAlign: "right" }}>
              <LoadingButton
                loading={mutation.isLoading}
                variant="contained"
                type="submit"
              >
                Submit
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ChangePassword;
