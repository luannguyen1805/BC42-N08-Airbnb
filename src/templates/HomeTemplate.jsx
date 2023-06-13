import React from "react";
import { Outlet } from "react-router-dom";
import PageFooter from "../components/Footer/PageFooter";
import HeaderPage from "../components/Header/HeaderPages";
import { CURRENT_USER, getStoreJSON } from "../utils/setting";

const HomeTemplate = () => {
  return (
    <div className="relative">
      <HeaderPage />
      <Outlet />
      <PageFooter />
    </div>
  );
};

export default HomeTemplate;
