"use client";
import React from "react";
import Card from "@/components/propertyList/Card";
import { Button } from "@mui/material";
import Link from "next/link";

const Listings = () => {
  const [latestProperties, setLatestProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Allproperty/all`,
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
        setLatestProperties(data.data);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="text-center">
      <h4 className="text-black text-3xl mt-10 font-light">Listings</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ml-12">
        {latestProperties.slice(0, 6).map((property, index) => (
          <Card key={index} property={property} />
        ))}
      </div>
      <Link href="/listings">
        <Button
          variant="outlined"
          className="mb-20 px-8 text-black capitalize hover:font-bold border-green hover:border-green"
        >
          Load More
        </Button>
      </Link>
    </div>
  );
};

export default Listings;
