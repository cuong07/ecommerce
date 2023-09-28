import React from 'react';
import { Outlet } from 'react-router';

function Public() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Public;
