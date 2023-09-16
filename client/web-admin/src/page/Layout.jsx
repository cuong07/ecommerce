import React from "react";
import { Footer, Header, Navigate } from "../common";

const Layout = ({ children, hiddenHeader, hiddenFooter, hiddenNavigate }) => {
  return (
    <div className="relative">
      {!hiddenHeader && (
        <div className="w-screen bg-white fixed">
          <Header />
        </div>
      )}
      <div className="flex overflow-hidden min-h-screen pt-20">
        {!hiddenNavigate && (
          <div className="shadow-lg w-[200px] min-h-screend">
            <Navigate />
          </div>
        )}
        <div className="flex-1"> {children}</div>
      </div>
    </div>
  );
};

export default Layout;
