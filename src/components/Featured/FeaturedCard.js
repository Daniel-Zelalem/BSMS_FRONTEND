"use client";
import Image from "next/image";
import React from "react";

const FeaturedCard = () => {
  const [property, setProperty] = React.useState({});
  React.useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Allproperty/number`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProperty(data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProperties();
  }, []);

  const featured = [
    {
      cover: "../images/hero/home.jpg",
      name: "House",
      total: property.House,
    },
    {
      cover: "../images/hero/car2.webp",
      name: "Vehicles",
      total: property.Vehicle,
    },
    {
      cover: "../images/hero/land.png",
      name: "Lands",
      total: property.Land,
    },
    {
      cover: "../images/hero/maid.png",
      name: "Job Seekers",
      total: property.Employee,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-10">
      {featured.map((item, index) => (
        <div className="box " key={index}>
          <img src={item.cover} alt={item.name} className="w-full text-sm" />
          <h4 className="text-base font-medium text-green">{item.name}</h4>
          <label className="text-sm font-medium">{item.total}</label>
        </div>
      ))}
    </div>
  );
};

export default FeaturedCard;
