import React from "react";
import { Footer, Header, Navigate } from "../common";

const Layout = ({ children, hiddenHeader, hiddenFooter, hiddenNavigate }) => {
  return (
    <div className="relative">
      {!hiddenHeader && (
        <div className="">
          <Header />
        </div>
      )}
      <div className="flex overflow-hidden">
        {!hiddenNavigate && (
          <div className="shadow-lg">
            <Navigate />
          </div>
        )}
        {children}
      </div>

      {!hiddenFooter && (
        <div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
