"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";

function Homepage() {
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData || {});
  }, []);

  const userToken = userData.user ? userData.token : "";

  useEffect(() => {
    if (userToken) {
      const fetchListings = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Allproperty/getProperty`,
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
          setMyProperties(data.data);
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

  if (loading)
    return (
      <div className="flex flex-col w-full items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin mx-auto w-12 h-12"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <h4 className="mx-auto items-center text-2xl pl-2">Loading...</h4>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const getStatusCellStyle = (status) => {
    let style = {
      padding: "6px 12px",
      borderRadius: "4px",
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "inherit",
    };

    if (status === "Pending") {
      style.color = "yellow";
      style.boxShadow = "0 0 13px #1ecab80d";
    } else if (status === "Rejected") {
      style.backgroundColor = "#f1646c26";
      style.color = "#f1646c";
      style.boxShadow = "0 0 13px #f1646c0d";
    } else if (status === "Approved") {
      style.backgroundColor = "#1ecab826";
      style.color = "#1ecab8";
      style.boxShadow = "0 0 13px #f1646c0d";
    } else if (status === "Assigned") {
      style.backgroundColor = "#1ecab826";
      style.color = "rgb(0, 167, 111)";
      style.boxShadow = "0 0 13px #f1646c0d";
    }

    return style;
  };

  const handleVisibilityClick = (property) => {
    const { propertyType, id } = property;
    window.location.href = `/listings/${propertyType}/detail/${id}`;
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 300,
      headerAlign: "center",
      renderHeader: (params) => <strong className=" text-md">{"Image"}</strong>,
      renderCell: (params) => (
        <div style={{ width: 250, height: 100, padding: 4 }}>
          <img
            alt="Image"
            src={params.value}
            layout="responsive"
            width={200}
            height={150}
            objectFit="cover"
            className="rounded"
          />
        </div>
      ),
    },
    {
      field: "propertyType",
      headerName: "Property Type",
      width: 150,
      headerAlign: "bold-header",
      renderHeader: (params) => (
        <strong className=" text-md">{"Property Type"}</strong>
      ),
      renderCell: (params) => (
        <div style={{ marginBottom: 100 }}>{params.value}</div>
      ),
    },
    {
      field: "status",
      headerName: "Status ",
      width: 150,
      headerAlign: "bold-header",
      renderHeader: (params) => (
        <strong className=" text-md">{"Status"}</strong>
      ),
      renderCell: (params) => (
        <div>
          <span style={getStatusCellStyle(params.value)}>{params.value}</span>
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Price ",
      width: 150,
      renderHeader: (params) => <strong className=" text-md">{"Price"}</strong>,
      renderCell: (params) => (
        <div style={{ paddingBottom: 100 }}>{params.value}</div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      renderHeader: (params) => (
        <strong className=" text-md">{"Actions"}</strong>
      ),
      renderCell: (params) => (
        <div>
          <Link
            href={`/listings/${params.row.propertyType}/detail/${params.row.id}`}
          >
            <IconButton aria-label="view" size="small">
              <VisibilityIcon color="black" />
            </IconButton>
          </Link>
        </div>
      ),
    },
  ];

  const rows = myProperties.map((item, index) => ({
    id: item._id,
    image: item.imageUrls[0],
    propertyType: item.PropertyType,
    status: item.Status,
    price: `${item.Price.toLocaleString()} ${item.Currency}`,
  }));

  return (
    <>
      <div
        style={{
          height: 537,
          width: "97%",
          marginLeft: 24,
          marginBottom: 4,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns.map((column) => ({
            ...column,
            headerClassName: "bold-header",
          }))}
          rowHeight={220}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          disableRowSelectionOnClick
          disableColumnSelector
          pageSizeOptions={[5, 10]}
        />
      </div>
    </>
  );
}

export default Homepage;
