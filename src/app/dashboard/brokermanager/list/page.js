"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDispatch } from "react-redux";
import { setValue } from "@/redux/features/auth-slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Homepage() {
  const dispatch = useDispatch();
  const [myProperties, setMyProperties] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [loadingBrokers, setLoadingBrokers] = useState(true);

  useEffect(() => {
    fetchBrokers();
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Allproperty/allProp`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setMyProperties(data.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoadingProperties(false);
    }
  };

  const fetchBrokers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${persistedState.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const brokers = data.response.filter((user) => user.Role === "Broker");
      setBrokers(brokers);
      console.log(brokers);
    } catch (error) {
      console.error("Error fetching brokers:", error);
    } finally {
      setLoadingBrokers(false);
    }
  };

  const getStatusCellStyle = (status) => {
    let style = {
      padding: "6px 12px",
      borderRadius: "4px",
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "inherit",
    };

    if (status === "Pending") {
      style.backgroundColor = "#1ecab826";
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

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 300,
      headerAlign: "center",
      renderHeader: (params) => (
        <strong className=" text-md">{"Image "}</strong>
      ),
      renderCell: (params) => (
        <div style={{ width: 250, height: 200, padding: 4 }}>
          <img
            alt="Image"
            src={params.value}
            layout="responsive"
            width={200}
            height={200}
            objectFit="cover"
          />
        </div>
      ),
    },
    {
      field: "propertyType",
      headerName: "Property Type",
      width: 140,
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
      width: 130,
      headerAlign: "bold-header",
      renderHeader: (params) => (
        <strong className=" text-md">{"Status "}</strong>
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
      renderHeader: (params) => (
        <strong className=" text-md">{"Price "}</strong>
      ),
      renderCell: (params) => (
        <div style={{ paddingBottom: 100 }}>{params.value}</div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderHeader: (params) => (
        <strong className=" text-md">{"Actions "}</strong>
      ),
      renderCell: (params) => (
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/listings/${params.row.propertyType}/detail/${params.row.id}`}
                >
                  <IconButton aria-label="view" size="medium">
                    <VisibilityIcon className="text-black" />
                  </IconButton>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Detail</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];

  const propertyRows = myProperties.map((item, index) => ({
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
        {loadingProperties ? (
          <p>Loading properties...</p>
        ) : (
          <DataGrid
            rows={propertyRows}
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
            disableMultipleRowSelection
            disableColumnSelector
            pageSizeOptions={[5, 10]}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default Homepage;
