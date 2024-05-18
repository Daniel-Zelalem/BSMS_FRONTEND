import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-row ">
      <Sidebar />
      <div className="bg-primary flex-1 ">{children}</div>
    </div>
  );
};

export default Layout;
