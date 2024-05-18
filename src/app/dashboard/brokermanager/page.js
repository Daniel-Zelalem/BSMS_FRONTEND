"use client";
import React, { useState, useEffect } from "react";
import Cards from "@/components/DashboardCom/Cards";
import HouseIcon from "@mui/icons-material/House";
import { LuUsers } from "react-icons/lu";
import { MdOutlineSupportAgent } from "react-icons/md";

const Home = () => {
  const [userData, setUserData] = React.useState({});
  const [loading, setLoading] = useState(true);
  const [data, setUsers] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [propertiesCount, setPropertiesCount] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalBrokers: 0,
  });

  React.useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData || {});
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Allproperty/allData`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setUsers(data.response);
        const counts = {
          totalUsers: data.totalUsers,
          totalProperties: data.totalProperties,
          totalBrokers: data.totalBrokers,
        };
        setPropertiesCount(counts);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const userToken = userData.user ? userData.token : "";

  return (
    <div>
      <div className="ml-4 flex flex-wrap md:gap-2 lg:gap-0 sm:gap-2">
        <div className="flex flex-grow justify-center lg:w-1/3 md:w-full sm:w-full ">
          <Cards
            title="Total Properties"
            amount={propertiesCount.totalProperties}
            icon={HouseIcon}
          />
        </div>
        <div className="flex flex-grow justify-center lg:w-1/3 md:w-full sm:w-full">
          <Cards
            title="Total Users"
            amount={propertiesCount.totalUsers}
            icon={LuUsers}
          />
        </div>
        <div className="flex flex-grow justify-center lg:w-1/3 md:w-full sm:w-full">
          <Cards
            title="Total Brokers"
            amount={propertiesCount.totalBrokers}
            icon={MdOutlineSupportAgent}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
