import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { Button, Grid, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
// @ts-ignore
import { AuthContext } from "../../context/AuthContext";
import StringAvatar from "./StringAvatar";

export default function ProfileView() {
  // @ts-ignore
  const { app_auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    let url = "/profile/doc/getProfile";
    console.log("url", url, app_auth.token);

    const res = await axios({
      method: "GET",
      url: url,
      data: "",
      headers: {
        Authorization: `Bearer ${app_auth.token}`,
      },
    });
    console.log("res", res.data.data.profile);
    return res.data.data.profile;
  };
  const info = useQuery("profile", fetchData, {
    retry: false,
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    onError: (data: any) => {
      if (data.response.data.code === 401) {
        logout();
      }
    },
  });

  console.log("info", info);

  const goEduEdit = (item: {}) => {
    navigate(`/profile-edu-edit`, {
      state: { pageTitle: "Education Info Edit", item: item },
    });
  };

  const goImageEdit = (item: {}) => {
    navigate(`/profile-image`, {
      state: {
        pageTitle: "Profile Image Update",
        review: info.data.profilePic,
      },
    });
  };

  const goJobEdit = (item: {}) => {
    navigate(`/profile-job-edit`, {
      state: { pageTitle: "Job Info Edit", item: item },
    });
  };

  if (info.isLoading) {
    return (
      <Box>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <Typography variant="h2">
            <Skeleton />
          </Typography>
        ))}
      </Box>
    );
  }

  return (
    <Card elevation={0}>
      <CardHeader
        avatar={
          info.data?.profilePic ? (
            <img
              src={info.data.profilePic}
              style={{ width: "45px", height: "45px", borderRadius: "50%" }}
              alt="profile image"
            />
          ) : (
            <StringAvatar
              avatarTitle={`${info.data?.firstName} ${info.data?.lastName}`}
            />
          )
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <EditIcon />
        //   </IconButton>
        // }
        title={`${info.data?.firstName} ${info.data?.lastName}`}
        subheader={info.data?.email}
      />

      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={styles.box}>
                  <Box sx={styles.box_left}>
                    <Typography variant="body1">First Name</Typography>
                  </Box>
                  <Box sx={styles.box_right}>
                    <Typography variant="body1">
                      {info.data?.firstName}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={styles.box}>
                  <Box sx={styles.box_left}>
                    <Typography variant="body1">Last Name</Typography>
                  </Box>
                  <Box sx={styles.box_right}>
                    <Typography variant="body1">
                      {info.data?.lastName}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={styles.box}>
                  <Box sx={styles.box_left}>
                    <Typography variant="body1">Phone Number</Typography>
                  </Box>
                  <Box sx={styles.box_right}>
                    <Typography variant="body1">
                      {info.data?.phoneNumber}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={styles.box}>
                  <Box sx={styles.box_left}>
                    <Typography variant="body1">Email</Typography>
                  </Box>
                  <Box sx={styles.box_right}>
                    <Typography variant="body1">{info.data?.email}</Typography>
                  </Box>
                </Box>
                <Box sx={styles.box}>
                  <Box sx={styles.box_left}>
                    <Typography variant="body1">Date of Birth</Typography>
                  </Box>
                  <Box sx={styles.box_right}>
                    <Typography variant="body1">
                      {moment(info.data?.dob).format("Do-MMM-YYYY")}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={styles.box}>
                  <Box sx={styles.box_left}>
                    <Typography variant="body1">BMD Number</Typography>
                  </Box>
                  <Box sx={styles.box_right}>
                    <Typography variant="body1">{info.data?.bmdcNo}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
                {info.data?.profilePic ? (
                  <Box sx={styles.profile_image}>
                    <img
                      src={info.data.profilePic}
                      style={{ width: "100%" }}
                      alt="profile image"
                    />
                    <div>
                      <IconButton
                        aria-label="settings"
                        sx={styles.profile_image_edit}
                        onClick={goImageEdit}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                  </Box>
                ) : (
                  <Button variant="outlined" onClick={goImageEdit}>
                    Add your Profile Image
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box sx={styles.info}>
              <Box sx={styles.title_wrapper}>
                <Typography sx={styles.title}>
                  Educational Information
                </Typography>
                <IconButton
                  aria-label="settings"
                  sx={styles.title_icon}
                  onClick={(e) => goEduEdit(info?.data?.edu_info)}
                >
                  {info?.data?.edu_info ? <EditIcon /> : <AddIcon />}
                </IconButton>
              </Box>
              {info?.data?.edu_info ? (
                <Box>
                  <Box sx={styles.box}>
                    <Box sx={styles.box_left}>
                      <Typography variant="body1">Academy Name</Typography>
                    </Box>
                    <Box sx={styles.box_right}>
                      <Typography variant="body1">
                        {info.data?.edu_info?.name}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={styles.box}>
                    <Box sx={styles.box_left}>
                      <Typography variant="body1">Academy Type</Typography>
                    </Box>
                    <Box sx={styles.box_right}>
                      <Typography variant="body1">
                        {info.data?.edu_info?.type}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={styles.box}>
                    <Box sx={styles.box_left}>
                      <Typography variant="body1">Passing Year</Typography>
                    </Box>
                    <Box sx={styles.box_right}>
                      <Typography variant="body1">
                        {moment(info.data?.edu_info?.year).format(
                          "Do-MMM-YYYY"
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Typography>
                    No education information found, please{" "}
                    <Button onClick={() => goEduEdit(info?.data?.edu_info)}>
                      add now
                    </Button>
                  </Typography>
                </Box>
              )}
            </Box>
            <Box sx={styles.info}>
              <Box sx={styles.title_wrapper}>
                <Typography sx={styles.title}>Job Information</Typography>
                <IconButton
                  aria-label="settings"
                  sx={styles.title_icon}
                  onClick={(e) => goJobEdit(info?.data?.job_info)}
                >
                  {info?.data?.job_info ? <EditIcon /> : <AddIcon />}
                </IconButton>
              </Box>
              {info.data?.job_info ? (
                <Box>
                  <Box sx={styles.box}>
                    <Box sx={styles.box_left}>
                      <Typography variant="body1">JOb Position</Typography>
                    </Box>
                    <Box sx={styles.box_right}>
                      <Typography variant="body1">
                        {info.data?.job_info?.jobPosition}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={styles.box}>
                    <Box sx={styles.box_left}>
                      <Typography variant="body1">Hospital Name</Typography>
                    </Box>
                    <Box sx={styles.box_right}>
                      <Typography variant="body1">
                        {info.data?.job_info?.hospitalName}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={styles.box}>
                    <Box sx={styles.box_left}>
                      <Typography variant="body1">Address</Typography>
                    </Box>
                    <Box sx={styles.box_right}>
                      <Typography variant="body1">
                        {info.data?.job_info?.address}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={styles.box}>
                    <Box sx={styles.box_left}>
                      <Typography variant="body1">District</Typography>
                    </Box>
                    <Box sx={styles.box_right}>
                      <Typography variant="body1">
                        {info.data?.job_info?.district}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={styles.box}>
                    <Box sx={styles.box_left}>
                      <Typography variant="body1">Joining Date</Typography>
                    </Box>
                    <Box sx={styles.box_right}>
                      <Typography variant="body1">
                        {moment(info.data?.job_info?.joiningDate).format(
                          "Do-MMM-YYYY"
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Typography>
                    No job information found, please
                    <Button onClick={(e) => goJobEdit(info?.data?.job_info)}>
                      add now
                    </Button>
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const styles = {
  box: {
    py: 1,
    display: "flex",
  },
  box_left: {
    flex: 1,
    mr: 2,
  },
  box_right: {
    flex: 2,
  },
  title_wrapper: {
    display: "flex",
    borderBottom: "1px solid #ddd",
    mb: 1,
  },
  title: {
    flex: 1,
    fontWeight: "500",
    fontSize: "1.2rem",
    // mb: 1,
  },
  title_icon: {
    mt: -1,
  },
  info: {
    mb: 3,
  },
  profile_image: {
    maxWidth: "200px",
    position: "relative",
    div: {
      display: "none",
    },
    "&:hover div": {
      display: "block",
    },
  },
  profile_image_edit: {
    position: "absolute",
    top: 3,
    right: 3,
    background: "rgba(255,255,255,0.3)",
  },
};
