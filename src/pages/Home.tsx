import { Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
//@ts-ignore
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  //@ts-ignore
  const { app_auth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  useEffect(() => {
    let decoded: any = jwt_decode(app_auth.token);
    setEmail(decoded.data.email);
  }, []);

  return (
    <div>
      <Typography variant="h3">Welcome {email}</Typography>
    </div>
  );
};

export default Home;
