import axios from "axios";
import React, { createContext, useReducer, useEffect } from "react";
import authReducer from "../reducer/authReducer";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [app_auth, dispatch] = useReducer(authReducer, {}, () => {
    const localData = localStorage.getItem("app_auth");
    return localData ? JSON.parse(localData) : {};
  });

  const otpGenerate = async (email, password) => {
    dispatch({
      type: "OTP_GENERATE",
      payload: {
        otpGenerate: true,
        email: email,
      },
    });
  };

  const otpVerify = async (data) => {
    dispatch({
      type: "OTP_GENERATE",
      payload: data,
    });
  };

  const logoutApi = async () => {
    let res = await axios({
      method: "post",
      url: "/auth/logout",
      data: null,
      headers: {
        Authorization: `Bearer ${app_auth.token}`,
      },
    });
  };

  const logout = () => {
    logoutApi();
    dispatch({
      type: "LOGOUT",
      payload: {},
    });
  };

  const otpForgotPassword = async (email, otp) => {
    dispatch({
      type: "OTP_GENERATE",
      payload: {
        otpGenerate: true,
        email: email,
        otp: otp,
      },
    });
  };

  useEffect(() => {
    localStorage.setItem("app_auth", JSON.stringify(app_auth));
  }, [otpGenerate, otpVerify]);
  return (
    <AuthContext.Provider
      value={{ app_auth, otpGenerate, otpVerify, logout, otpForgotPassword }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
