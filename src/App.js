import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/assets/scss/style.scss";
import Loading from "./components/Loading/Loading";

const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login'));
const DashBoard = lazy(() => import("./pages/AdminPages/Dashboard/DashBoard"));
const DetailPages = lazy(() => import("./pages/DetailPages/DetailPages"));
const Register = lazy(() => import("./pages/Register/Register"));
const RoomManagement = lazy(() => import("./pages/AdminPages/TestPage/RoomManage"));
const HomeTemplate = lazy(() => import("./templates/HomeTemplate"));
const UserManagement = lazy(() => import("./pages/AdminPages/TestPage/UserManage"));
const LocationManagement = lazy(() => import("./pages/AdminPages/TestPage/LocationManage"));
const CreateUser = lazy(() => import("./pages/AdminPages/TestPage/CreateUser"));
const UpdateUser = lazy(() => import("./pages/AdminPages/TestPage/UpdateUser"));
const CreateRoom = lazy(() => import("./pages/AdminPages/TestPage/CreateRoom"));
const UpdateRoom = lazy(() => import("./pages/AdminPages/TestPage/UpdateRoom"));
const CreateLocation = lazy(() => import("./pages/AdminPages/TestPage/CreateLocation"));
const UpdateLocation = lazy(() => import("./pages/AdminPages/TestPage/UpdateLocation"));
const BookingManagement = lazy(() => import("./pages/AdminPages/TestPage/BookingManage"));
const UpdateBooking = lazy(() => import("./pages/AdminPages/TestPage/UpdateBooking"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const RoomItem = lazy(() => import("./pages/Profile/RoomProfile/RoomItem"));
const DetailLocation = lazy(() => import("./pages/DetailLocation/DetailLocation"));
const DashBoardInfor = lazy(() => import("./pages/AdminPages/Dashboard/DashBoardInfor"));

export const history = createBrowserHistory({ window });

export const toastOptionsErr = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
export const toastOptionsSuccess = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomeTemplate />}>
              <Route index element={<Home />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="detailRoom">
                <Route path=":id" element={<DetailPages />} />
              </Route>
              <Route path="/detailLocation">
                <Route path=":id/:nameLocationRoom" element={<DetailLocation />} />
              </Route>
              <Route path="*" element={<Navigate to="" />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/test1" element={<RoomItem />} />
            <Route path="/admin/dashboard" element={<DashBoard />}>
              <Route path="DashBoardInfor" element={<DashBoardInfor />} />
              <Route path="userAdmin" element={<UserManagement />} />
              <Route path="roomAdmin" element={<RoomManagement />} />
              <Route path="locationAdmin" element={<LocationManagement />} />
              <Route path="bookingAdmin" element={<BookingManagement />} />
              <Route path="userAdmin/createUser" element={<CreateUser />} />
              <Route path="userAdmin/updateUser/:id" element={<UpdateUser />} />
              <Route path="roomAdmin/createRoom" element={<CreateRoom />} />
              <Route path="roomAdmin/updateRoom/:id" element={<UpdateRoom />} />
              <Route path="locationAdmin/createLocation" element={<CreateLocation />} />
              <Route path="locationAdmin/updateLocation/:id" element={<UpdateLocation />} />
              <Route path="bookingAdmin/updateBooking/:id" element={<UpdateBooking />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer {...toastOptionsErr} />
    </>
  );
};

export default App;
