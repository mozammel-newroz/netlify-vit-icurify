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
import { SetMeal } from "@mui/icons-material";
import MyYearPicker from "../../components/MyYearPicker";

const EduInfo = () => {
  const location = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // @ts-ignore
  const { app_auth } = useContext(AuthContext);

  const [medIns, setMedIns] = useState("");
  const [medType, setMedType] = useState("");
  const [medYear, setMedYear] = useState("");

  const sendUpdate = async (postData: any) => {
    let url = "/profile/doc/updateEduInfo";
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
      medIns: medIns,
      medType: medType,
      medYear: medYear,
    };
    mutation.mutate(postData);
  };

  const fetchData = async () => {
    let url = "/common/getMedicalList";
    console.log("url", url, app_auth.token);

    const res = await axios({
      method: "GET",
      url: url,
      data: "",
      headers: {
        Authorization: `Bearer ${app_auth.token}`,
      },
    });
    console.log("colleges", res.data.data);
    return res.data.data;
  };
  const colleges = useQuery("college-list", fetchData);

  console.log("is array", Array.isArray(colleges.data), colleges.data);

  useEffect(() => {
    let info = location.state?.item;
    console.log("edu info", info);
    setMedIns(info?.id);
    if (info?.type == "Medical") {
      setMedType("1");
    } else {
      setMedType("2");
    }

    setMedYear(info?.year);
  }, []);

  if (colleges.isLoading) {
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
          <Typography variant="body1">Medical Institute Type</Typography>

          <FormControl fullWidth size="small" sx={styles.text_field}>
            <InputLabel id="hospital-label-type">
              Select Institute Type
            </InputLabel>
            <Select
              labelId="hospital-label-type"
              id="type"
              value={medType}
              label="Select Institute Type"
              onChange={(e: any) => setMedType(e.target.value)}
            >
              <MenuItem value={1}>Medical College</MenuItem>
              <MenuItem value={2}>Dental College</MenuItem>
            </Select>
          </FormControl>

          {medType && (
            <Typography variant="body1">Medical Institute Name</Typography>
          )}
          {medType == "1" && (
            <FormControl fullWidth size="small" sx={styles.text_field}>
              <InputLabel id="hospital-label">
                Select Medical Institute Name
              </InputLabel>
              <Select
                labelId="hospital-label"
                id="hospital"
                value={medIns}
                label="Select Medical Institute Name"
                onChange={(e) => setMedIns(e.target.value)}
              >
                {colleges.data.medicalCollegeList.map((e: any) => (
                  <MenuItem value={e._id}>{e.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {medType == "2" && (
            <FormControl fullWidth size="small" sx={styles.text_field}>
              <InputLabel id="hospital-label">
                Select Dental Institute Name
              </InputLabel>
              <Select
                labelId="hospital-label"
                id="hospital"
                value={medIns}
                label="Select Dental Institute Name"
                onChange={(e) => setMedIns(e.target.value)}
              >
                {colleges.data.dentalList.map((e: any) => (
                  <MenuItem value={e._id}>{e.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl fullWidth size="small" sx={styles.text_field}>
            <MyYearPicker
              date={medYear}
              setDate={setMedYear}
              fieldTitle="Enter Year"
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

export default EduInfo;
