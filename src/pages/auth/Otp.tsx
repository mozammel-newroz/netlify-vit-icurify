import React, { useContext, useEffect, useState } from "react";
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
import OtpInput from "react-otp-input";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import LoadingButton from "@mui/lab/LoadingButton";
// import axios from "axios";
// @ts-ignore
import { AuthContext } from "../../context/AuthContext";

import loginBanner from "../../assets/login.jpg";

const Otp = () => {
  const navigate = useNavigate();
  //@ts-ignore
  const { app_auth } = useContext(AuthContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [otp, setOtp] = useState<string>("");

  const sendOtp = async (postData: any) => {
    let url = "/auth/doc/signup/verifyOtp";
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
      enqueueSnackbar("Successfully registered!! Login Please ", {
        variant: "success",
        anchorOrigin: {
          horizontal: "center",
          vertical: "top",
        },
      });
      navigate("/login");
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
      otp,
      email: app_auth.email,
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
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              Verify your identity
            </Typography>
            <Typography variant="subtitle1" sx={{ mt:1 }}>
            We have sent 6 digits verification code (OTP) to your email address.
            </Typography>

            <Box mt={3}>
              <OtpInput
                value={otp}
                onChange={(e: any) => setOtp(e)}
                numInputs={6}
                shouldAutoFocus={true}
                isInputSecure={true}
                separator={<span>-</span>}
                inputStyle={{
                  width: "100%",
                  height: "50px",
                  color: "#000",
                  // display: 'flex',
                  // justifyContent: 'space-between'
                }}
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

export default Otp;
