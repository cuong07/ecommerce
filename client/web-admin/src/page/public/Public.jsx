import React from "react";
import { Footer, Header } from "../../common";
import { Outlet } from "react-router";
import Layout from "../Layout";

const Public = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Public;
