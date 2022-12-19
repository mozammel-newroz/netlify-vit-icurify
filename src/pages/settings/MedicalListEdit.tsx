import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Box } from "@mui/system";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import axios from "axios";

const MedicalListEdit = () => {
  const location = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [name, setName] = useState<string>("");
  const [shortName, setShortName] = useState<string>("");
  const [medIns, setMedIns] = useState<string>("");
  const [district, setDistrict] = useState<string>("");

  const sendUpdate = async (postData: any) => {
    let url = "/profile/doc/updateEduInfo";
    console.log("url", url);

    const res = await axios({
      method: "post",
      url: url,
      data: postData,
    });
    console.log("res", res);
    return res;
  };

  const mutation = useMutation(sendUpdate, {
    onSuccess: (data, variable, context) => {
      console.log("success", data, variable, context);
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
      medIns,
      medType: 1,
      medYear: '2010'
    };
    mutation.mutate(postData);
  };

  useEffect(() => {
    let info = location.state?.item;
    setMedIns(info._id)
    setName(info.name);
    setShortName(info.shortName);
    setDistrict(info.district);
  }, []);

  return (
    <div>
      <Box sx={styles.box_wrapper}>
        <Box sx={styles.box}>
          <Typography variant="body1">Academy Name</Typography>
          <TextField
            sx={styles.text_field}
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Enter Medical Academy Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography variant="body1">Short Name</Typography>
          <TextField
            sx={styles.text_field}
            variant="outlined"
            size="small"
            fullWidth
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
          />
          <Typography variant="body1">District</Typography>
          <TextField
            sx={styles.text_field}
            variant="outlined"
            size="small"
            fullWidth
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
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

export default MedicalListEdit;
