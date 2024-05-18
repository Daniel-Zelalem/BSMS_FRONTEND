"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import { IconButton, Modal, Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineAppRegistration } from "react-icons/md";

import "react-toastify/dist/ReactToastify.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Homepage() {
  const [open, setOpen] = useState(false);
  const [myProperties, setMyProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [propType, setPropType] = useState("");
  const [id, setId] = useState(1);
  const [pdfs, setPdfs] = useState([]);
  const [userData, setUserData] = React.useState({});
  React.useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData || {});
  }, []);

  const showToastMessage = (message, type) => {
    toast.success(message, {
      position: "top-right",
    });
  };
  const showToastError = (message) => {
    toast.error(message, {
      position: "top-right",
    });
  };
  const onApprove = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("agreementDocUrl[]", pdfs[0]);
    formDataToSend.append("Status", "Approved");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/${propType}/approve/${id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      if (res.success) {
        showToastMessage(res.message);
        showToastMessage();
      } else {
        showToastError(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
      showToastError("An error occurred. Please try again."); // Show error toast message
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Allproperty/getProperty`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userData.user?.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMyProperties(data.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoadingProperties(false);
      }
    };
    fetchListings();
  }, [userData.user?.token]);

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
      style.color = "#1ecab8";
      style.boxShadow = "0 0 13px #1ecab80d";
    } else if (status === "Rejected") {
      style.backgroundColor = "#f1646c26";
      style.color = "#f1646c";
      style.boxShadow = "0 0 13px #f1646c0d";
    }

    return style;
  };

  const handleVisibilityClick = (property) => {
    const { propertyType, id } = property;
    window.location.href = `/listings/${propertyType}/${id}`;
  };
  const handlePdfChange = (event) => {
    const selectedPdfs = Array.from(event.target.files);
    setPdfs((prevPdfs) => [...prevPdfs, ...selectedPdfs]);
    console.log([pdfs, ...selectedPdfs]); // Log the updated state immediately after setting it
  };
  const handleRemovePdf = (indexToRemove) => {
    setPdfs((prevPdfs) =>
      prevPdfs.filter((_, index) => index !== indexToRemove)
    );
  };
  const handleAssignClick = (property) => {
    setOpen(true);
    setId(property.id);
    setPropType(property.propertyType);
  };
  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 300,
      headerAlign: "center",
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
      width: 150,
      headerAlign: "bold-header",
      renderCell: (params) => (
        <div style={{ marginBottom: 100 }}>{params.value}</div>
      ),
    },
    {
      field: "status",
      headerName: "Status ",
      width: 150,
      headerAlign: "bold-header",
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
      renderCell: (params) => (
        <div style={{ paddingBottom: 100 }}>{params.value}</div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="view"
            size="small"
            onClick={() => handleVisibilityClick(params.row)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            aria-label="view"
            size="small"
            onClick={() => handleAssignClick(params.row)}
          >
            <MdOutlineAppRegistration />
          </IconButton>
        </div>
      ),
    },
  ];

  const propertyRows = myProperties.map((item, index) => ({
    id: item._id,
    image: item.imageUrls[0],
    propertyType: item.PropertyType,
    status: item.Status,
    price: item.Price,
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
            rowHeight={300}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
          />
        )}
      </div>

      <Modal
        open={open}
        className="dialog-modal__box "
        PaperProps={{ sx: { width: "30%", height: "80%" } }}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Approve Property
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="mt-4">
              <label htmlFor="title" className="font-bold">
                Property Agreement Documents :
              </label>
              <div className="w-full rounded-lg border border-gray-300 p-4">
                <input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf" // Accepts only PDF files
                  multiple
                  onChange={handlePdfChange}
                  className="hidden"
                />
                <label
                  htmlFor="pdf-upload"
                  className="custom-file-upload block mx-auto text-center text-black rounded-lg p-2 cursor-pointer mt-4"
                >
                  Click to Select PDF files
                </label>
                <label
                  htmlFor="pdf-upload"
                  className="custom-file-upload block w-36 mx-auto text-center bg-green text-white rounded-lg p-2 cursor-pointer mt-1"
                >
                  Browse PDF files
                </label>
                <div className="flex flex-wrap">
                  {pdfs.map((pdf, index) => (
                    <div key={index} style={{ position: "relative" }}>
                      <embed
                        src={URL.createObjectURL(pdf)}
                        type="application/pdf"
                        className="max-w-200px m-2"
                      />
                      <button
                        aria-label="delete"
                        onClick={() => handleRemovePdf(index)}
                        className="absolute top-0 right-0 text-red-500 bg-transparent border-none cursor-pointer mb-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M15.293 4.293a1 1 0 0 1 1.414 1.414L11.414 12l5.293 5.293a1 1 0 1 1-1.414 1.414L10 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L8.586 12 3.293 6.707a1 1 0 0 1 1.414-1.414L10 10.586l5.293-5.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-10 text-right">
              <Button
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  backgroundColor: "green",
                  marginRight: 15,
                }}
                onClick={onApprove}
              >
                Approve
              </Button>
              <Button
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  backgroundColor: "red",
                }}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Homepage;
