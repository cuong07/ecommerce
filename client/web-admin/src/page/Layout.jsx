import React from 'react';
import { Footer, Header, Navigate } from '../common';

function Layout({
  children, hiddenHeader, hiddenNavigate,
}) {
  return (
    <div className="relative">
      {!hiddenHeader && (
        <div className="w-screen bg-white fixed z-50">
          <Header />
        </div>
      )}
      <div className={`flex overflow-hidden min-h-screen ${!hiddenHeader ? 'pt-20' : ''} `}>
        {!hiddenNavigate && (
          <div className="shadow-lg w-[200px] min-h-screen fixed bg-white z-40 left-0 overflow-auto">
            <Navigate />
          </div>
        )}
        <div className={`flex-1 overflow-auto ${!hiddenNavigate ? 'ml-[200px]' : ''} `}>
          {' '}
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
