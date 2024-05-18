"use client";
import React, { useState, useEffect } from "react";
import Cards from "@/components/DashboardCom/Cards";
import HouseIcon from "@mui/icons-material/House";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function Homepage() {
  const [loading, setLoading] = useState(true);
  const [myProperties, setMyProperties] = useState([]);
  const [error, setError] = React.useState(null);
  const [propertyCounts, setPropertyCounts] = useState({
    total: 0,
    approved: 0,
    assigned: 0,
  });

  const [userData, setUserData] = React.useState({});
  React.useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData || {});
  }, []);

  const userToken = userData.suser ? userData.token : "";
  useEffect(() => {
    if (userToken) {
      const fetchListings = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Allproperty/getMe`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          console.log(data);
          setMyProperties(data);

          const counts = {
            total: data.totalProperties,
            approved: data.approvedProperties,
            assigned: data.assignedProperties,
          };
          setPropertyCounts(counts);
        } catch (error) {
          console.error("Error:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchListings();
    }
  }, [userToken]);

  return (
    <>
      <div className="ml-4 flex flex-wrap md:gap-2 lg:gap-0 sm:gap-2">
        {/* Display three Cards in a row with equal width */}
        <div className="flex flex-grow justify-center lg:w-1/3 md:w-full sm:w-full ">
          <Cards
            title="Total Properties"
            amount={propertyCounts.total}
            icon={HouseIcon}
          />
        </div>
        <div className="flex flex-grow justify-center lg:w-1/3 md:w-full sm:w-full">
          <Cards
            title="Assigned Properties"
            amount={propertyCounts.assigned}
            icon={AccessTimeIcon}
          />
        </div>
        <div className="flex flex-grow justify-center lg:w-1/3 md:w-full sm:w-full">
          <Cards
            title="Published "
            amount={propertyCounts.approved}
            icon={CloudUploadIcon}
          />
        </div>
      </div>
    </>
  );
}

export default Homepage;
