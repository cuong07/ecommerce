import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

function Public() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, []);
  return (
    <div className="bg-[#f8f9f9]">
      <Outlet />
    </div>
  );
}

export default Public;
