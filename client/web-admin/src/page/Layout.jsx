import React from "react";
import { Footer, Header, Navigate } from "../common";

function Layout({ children }) {
  return (
    <div className="">
      <div className="w-screen bg-white fixed z-50 shadow-chart">
        <Header />
      </div>
      <div className="flex overflow-hidden min-h-screen pt-20">
        <div className="shadow-md w-[200px] pt-20 fixed h-full flex items-start  bg-[#343a40] overflow-auto bottom-0">
          <Navigate />
        </div>
        <div className="flex-1 overflow-auto ml-[200px]">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
