import React, { useState, useContext, useEffect } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
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

import loginBanner from "../../assets/login.jpg";

const Signup = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //@ts-ignore
  const { otpVerify, app_auth } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const sendOtp = async (postData: any) => {
    let url = "/auth/doc/signin";
    console.log("url", url);

    const res = await axios({
      method: "post",
      url: url,
      data: postData,
    });
    console.log("res", res);
    return res;
  };

  const mutation = useMutation(sendOtp, {
    onSuccess: (data, variable, context) => {
      console.log("success", data, variable, context);
      otpVerify(data.data.data);
      navigate("/");
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
      email,
      password,
    };
    mutation.mutate(postData);
  };

  useEffect(() => {
    if (app_auth?.token) {
      navigate("/");
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: `url(${loginBanner})`,
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
            {/* <img src={logo} alt="" style={{ maxHeight: "40px" }} /> */}
            <Typography variant="h3">iCurify</Typography>
            <Typography variant="h5" sx={{ fontWeight: 500, color: "#29335C" }}>
              Login to Continue
            </Typography>

            <Box mt={3}>
              <TextField
                placeholder="Email Address"
                name="email"
                // required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box mt={3}>
              <TextField
                fullWidth
                placeholder="Password"
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
            <Box mt={3} sx={{ textAlign: "right" }}>
              <LoadingButton
                loading={mutation.isLoading}
                variant="contained"
                type="submit"
              >
                Continue
              </LoadingButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              {/* <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember Me"
              /> */}
              <Link to="/signup">
                <Typography>Register now</Typography>
              </Link>
              <Link to="#">
                <Typography>Forgot Password</Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Signup;
