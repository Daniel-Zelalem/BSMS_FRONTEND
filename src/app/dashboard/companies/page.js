"use client";
import React, { useState, useEffect } from "react";
import Cards from "@/components/DashboardCom/Cards";
import { FaUserAltSlash } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaHospitalUser } from "react-icons/fa";

function Homepage() {
  const [userData, setUserData] = React.useState({});
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [managerCount, setManagerCount] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  React.useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData || {});
  }, []);

  const userToken = userData.user ? userData.token : "";
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/manager`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data.response);
      const counts = {
        total: data.response.length,
        active: data.response.filter((property) => property.Status === "Active")
          .length,
        deactive: data.response.filter(
          (property) => property.Status === "Deactive"
        ).length,
      };
      setManagerCount(counts);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  fetchUsers();
  return (
    <>
      <div className="ml-4 flex flex-wrap md:gap-2 lg:gap-0 sm:gap-2">
        {/* Display three Cards in a row with equal width */}
        <div className="flex flex-grow justify-center lg:w-1/3 md:w-full sm:w-full ">
          <Cards
            title="Total Managers"
            amount={managerCount.total}
            icon={FaHospitalUser}
          />
        </div>
        <div className="flex flex-grow justify-center lg:w-1/3 md:w-full sm:w-full">
          <Cards
            title="Active Managers"
            amount={managerCount.active}
            icon={FaUserCheck}
          />
        </div>
        <div className="flex flex-grow justify-center lg:w-1/3 md:w-full sm:w-full">
          <Cards
            title="Deactive Managers"
            amount={managerCount.deactive}
            icon={FaUserAltSlash}
          />
        </div>
      </div>
    </>
  );
}

export default Homepage;
