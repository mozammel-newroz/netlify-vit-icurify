import {
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
// @ts-ignore
import { AuthContext } from "../../context/AuthContext";
import MyDatePicker from "../../components/MyDatePicker";

const JobEdit = () => {
  const location = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // @ts-ignore
  const { app_auth } = useContext(AuthContext);

  const [hospitalId, setHospitalId] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const sendUpdate = async (postData: any) => {
    let url = "/profile/doc/updateJobInfo";
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

  const mutation = useMutation(sendUpdate, {
    onSuccess: (data, variable, context) => {
      console.log("success", data.data.message);
      enqueueSnackbar(data.data.message, {
        variant: "success",
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

    let postData = {
      hospitalId: hospitalId,
      jobPosition: jobPosition,
      joiningDate: joiningDate,
    };
    mutation.mutate(postData);
  };

  const fetchData = async () => {
    let url = "/common/getHospitalList";
    console.log("url", url, app_auth.token);

    const res = await axios({
      method: "GET",
      url: url,
      data: "",
      headers: {
        Authorization: `Bearer ${app_auth.token}`,
      },
    });
    console.log("hospitals", res.data.data.hospitalList);
    return res.data.data.hospitalList;
  };
  const hospitals = useQuery("hospital-list", fetchData);

  console.log("is array", Array.isArray(hospitals.data), hospitals.data);

  useEffect(() => {
    let info = location.state?.item;
    console.log("info", info);
    setHospitalId(info?.id);
    setJobPosition(info?.jobPosition);
    setJoiningDate(info?.joiningDate);
  }, []);

  if (hospitals.isLoading) {
    return (
      <Box sx={styles.box_wrapper}>
        <Box sx={styles.box}>
        <LinearProgress  />
        </Box>
      </Box>
    );
  }
  return (
    <div>
      <Box sx={styles.box_wrapper}>
        <Box sx={styles.box}>
          <Typography variant="body1">Hospital Name</Typography>
          {/* <TextField
            sx={styles.text_field}
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Enter Hospital Name"
            value={hospitalId}
            onChange={(e) => setHospitalId(e.target.value)}
          /> */}
          <FormControl fullWidth size="small" sx={styles.text_field}>
            <InputLabel id="hospital-label">Select Hospital Name</InputLabel>
            <Select
              labelId="hospital-label"
              id="hospital"
              value={hospitalId}
              label="Select Hospital Name"
              onChange={(e) => setHospitalId(e.target.value)}
            >
              {hospitals.data.map((e: any) => (
                <MenuItem value={e._id}>{e.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="body1">Job Position</Typography>
          <TextField
            sx={styles.text_field}
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Enter Job Position"
            value={jobPosition}
            onChange={(e) => setJobPosition(e.target.value)}
          />

          <FormControl fullWidth size="small" sx={styles.text_field}>
            <MyDatePicker
              date={joiningDate}
              setDate={setJoiningDate}
              fieldTitle="Enter Joining Date"
            />
          </FormControl>

          <Button
            sx={{ float: "right" }}
            variant="contained"
            onClick={handleContinue}
          >
            Update
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

export default JobEdit;
