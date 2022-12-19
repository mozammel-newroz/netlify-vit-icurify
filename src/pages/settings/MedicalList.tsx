import React, { useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// @ts-ignore
import { AuthContext } from "../../context/AuthContext";
import { Button, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";

const MedicalList = () => {
  // @ts-ignore
  const { app_auth } = useContext(AuthContext);
  const navigate = useNavigate();

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
    console.log("res", res.data.data.medicalCollegeList);
    return res.data.data;
  };
  const info = useQuery("medical-list", fetchData);

  const goEdit = (item: {}) => {
    navigate(`/medical-list-edit`, {
      state: { pageTitle: "Medical Academy Edit", item: item },
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
    <div>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Medical College List
      </Typography>

      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Short Name</TableCell>
              <TableCell>District</TableCell>
              <TableCell width={200}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {info?.data?.medicalCollegeList.map((item: any) => (
              <TableRow>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.shortName}</TableCell>
                <TableCell>{item.district}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={(e) => goEdit(item)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h5" sx={{ mb: 1, mt: 5 }}>
        Dental College List
      </Typography>
      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Short Name</TableCell>
              <TableCell>District</TableCell>
              <TableCell width={200}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {info?.data?.dentalList.map((item: any) => (
              <TableRow>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.shortName}</TableCell>
                <TableCell>{item.district}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MedicalList;
