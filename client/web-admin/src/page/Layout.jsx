import React from "react";
import { Footer, Header, Navigate } from "../common";

function Layout({ children, hiddenHeader, hiddenNavigate }) {
  return (
    <div className="relative">
      {!hiddenHeader && (
        <div className="w-screen bg-white fixed z-50">
          <Header />
        </div>
      )}
      <div
        className={`flex overflow-hidden min-h-screen ${
          !hiddenHeader ? "pt-20" : ""
        } `}
      >
        <div className="shadow-lg md:w-[200px] flex items-start h-full mt-20 fixed bg-white z-40 left-0 overflow-auto bottom-0 w-full">
          <Navigate />
        </div>
        <div
          className={`flex-1 overflow-auto ${
            !hiddenNavigate ? "md:ml-[200px]" : ""
          } `}
        >
          {" "}
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
