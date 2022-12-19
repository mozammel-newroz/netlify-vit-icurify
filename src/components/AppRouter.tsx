import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ChangePassword from "../pages/auth/ChangePassword";
// @ts-ignore
import PrivateRouter from "./PrivateRouter";
const Layout = lazy(()=>import("./Layout")) ;
const About = lazy(() => import("../pages/About"));
const Login = lazy(() => import("../pages/auth/Login"));
const Otp = lazy(() => import("../pages/auth/Otp"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const Home = lazy(() => import("../pages/Home"));
const NoMatch = lazy(() => import("../pages/NoMatch"));
const ProfileView = lazy(() => import("../pages/profile/ProfileView"));
const ProfileEdit = lazy(() => import("../pages/profile/ProfileEdit"));
const MedicalList = lazy(() => import("../pages/settings/MedicalList"));
const MedicalListEdit = lazy(() => import("../pages/settings/MedicalListEdit"));
const EduEdit = lazy(() => import("../pages/profile/EduEdit"));
const JobEdit = lazy(() => import("../pages/profile/JobEdit"));
const ProfileImageEdit = lazy(
  () => import("../pages/profile/ProfileImageEdit")
);

const AppRoute = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRouter>
                <Home />
              </PrivateRouter>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRouter>
                <ProfileView />
              </PrivateRouter>
            }
          />
          <Route
            path="profile-edit"
            element={
              <PrivateRouter>
                <ProfileEdit />
              </PrivateRouter>
            }
          />
          <Route
            path="profile-image"
            element={
              <PrivateRouter>
                <ProfileImageEdit />
              </PrivateRouter>
            }
          />
          <Route
            path="profile-edu-edit"
            element={
              <PrivateRouter>
                <EduEdit />
              </PrivateRouter>
            }
          />
          <Route
            path="profile-job-edit"
            element={
              <PrivateRouter>
                <JobEdit />
              </PrivateRouter>
            }
          />
          <Route
            path="medial-list"
            element={
              <PrivateRouter>
                <MedicalList />
              </PrivateRouter>
            }
          />
          <Route
            path="medical-list-edit"
            element={
              <PrivateRouter>
                <MedicalListEdit />
              </PrivateRouter>
            }
          />
          <Route
            path="about"
            element={
              <PrivateRouter>
                <About />
              </PrivateRouter>
            }
          />
          <Route
            path="change-password"
            element={
              <PrivateRouter>
                <ChangePassword />
              </PrivateRouter>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoute;
