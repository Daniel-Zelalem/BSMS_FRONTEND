import React from "react";
import Sidebar from "@/components/DashboardCom/Sidebar";
import Header from "@/components/DashboardCom/Header";

const DashboardPage = ({ Component, pageProps }) => {
  return (
    <Sidebar>
      <Header />
      <Component {...pageProps} />
    </Sidebar>
  );
};

export default DashboardPage;
