import React from "react";
import { Footer, Header, Navigate } from "../common";

const Layout = ({ children, hiddenHeader, hiddenFooter, hiddenNavigate }) => {
  return (
    <>
      {!hiddenHeader && (
        <div>
          <Header />
        </div>
      )}
      <div className="flex">
        {!hiddenNavigate && (
          <div>
            <Navigate />
          </div>
        )}
        <div className="flex-1 border-blue-200 border">{children}</div>
      </div>

      {!hiddenFooter && (
        <div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Layout;
