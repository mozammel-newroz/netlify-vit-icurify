import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

// @ts-ignore
import { useMutation, useQuery } from "react-query";
// @ts-ignore
import { AuthContext } from "../../context/AuthContext";
import MyDatePicker from "../../components/MyDatePicker";
import thumbnail from "../../assets/thumbnail.jpg";

const ProfileImageEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // @ts-ignore
  const { app_auth } = useContext(AuthContext);

  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const sendUpdate = async (postData: any) => {
    let url = "/profile/doc/updateProfileImage";
    console.log("url", url, postData);

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

  const mutation = useMutation(sendUpdate, {
    onSuccess: (data, variable, context) => {
      console.log("success", data.data.message);
      enqueueSnackbar(data.data.message, {
        variant: "success",
      });
      navigate(`/profile`, {
        state: { pageTitle: "Profile" },
      });
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

    let postData = { profileImage };
    mutation.mutate(postData);
  };

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async function handleFile() {
    // @ts-ignore
    let file = document.querySelector("#myfile").files[0];
    let myImage: any = await toBase64(file);
    const base64String = myImage.replace("data:", "").replace(/^.+,/, "");
    setProfileImage(base64String);
    setPreviewImage(myImage);
  }

  useEffect(() => {
    setPreviewImage(location.state.review);
  }, []);

  if (mutation.isLoading) {
    return (
      <Box sx={styles.box_wrapper}>
        <Box sx={styles.box}>
          {[0, 1, 2, 3, 4].map((item) => (
            <Typography variant="h2">
              <Skeleton />
            </Typography>
          ))}
        </Box>
      </Box>
    );
  }
  return (
    <div>
      <Box sx={styles.box_wrapper}>
        <Box sx={styles.box}>
          <Box sx={{ textAlign: "center" }}>
            <img
              src={previewImage ? previewImage : thumbnail}
              alt=""
              width={150}
            />
            {/* <Typography variant="body1">Select Profile Image</Typography> */}
          </Box>
          <TextField
            sx={styles.text_field}
            variant="outlined"
            size="small"
            type="file"
            id="myfile"
            fullWidth
            placeholder="Enter Job Position"
            onChange={handleFile}
          />

          <Button
            sx={{ float: "right" }}
            variant="contained"
            onClick={handleContinue}
          >
            Update Profile Image
          </Button>
        </Box>
      </Box>
    </div>
  );
};

const styles = {
  box_wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: 5,
  },
  box: {
    borderRadius: "7px",
    border: "1px  #f1f1f1 solid",
    width: "700px",
    p: 3,
  },
  text_field: {
    mb: 2,
    mt: 1,
  },
};

export default ProfileImageEdit;
