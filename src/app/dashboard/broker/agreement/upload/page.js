"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDispatch } from "react-redux";
import { RiFileUploadLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  const [pdfs, setPdfs] = useState([]);
  const [users, setUsers] = useState([]);
  const [sellerEmail, setSellerEmail] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [pdfError, setPdfError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [userData, setUserData] = React.useState({});
  React.useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData || {});
  }, []);
  const docsSchema = yup.object().shape({
    Price: yup
      .number()
      .typeError("Price required and must be a number")
      .required("Price is required")
      .test(
        "is-positive",
        "Price must be a positive number",
        (value) => parseFloat(value) > 0
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(docsSchema),
  });
  const handleDialogOpen = (property) => {
    setIsOpen(true);
    setSelectedProperty(property);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };
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

  const router = useRouter();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Allproperty/approved`,
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

    const fetchBrokers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/`,
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
        const brokers = data.response.filter((user) => user.Role === "Broker");
        setBrokers(brokers);
      } catch (error) {
        console.error("Error fetching brokers:", error);
      } finally {
        setLoadingBrokers(false);
      }
    };

    fetchBrokers();
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
    } else if (status === "Assigned") {
      style.backgroundColor = "#1ecab826";
      style.color = "rgb(0, 167, 111)";
      style.boxShadow = "0 0 13px #f1646c0d";
    } else if (status === "Approved") {
      style.backgroundColor = "#1ecab826";
      style.color = "rgb(0, 167, 111)";
      style.boxShadow = "0 0 13px #f1646c0d";
    }

    return style;
  };
  const handleVisibilityClick = (property) => {
    const { propertyType, id } = property;
    window.location.href = `/listings/${propertyType}/${id}`;
  };

  const handleSellerChange = (value) => {
    setSellerEmail(value);
  };
  const handleBuyerChange = (value) => {
    setBuyerEmail(value);
  };
  const handlePdfChange = (event) => {
    const selectedPdfs = Array.from(event.target.files);
    setPdfs((prevPdfs) => [...prevPdfs, ...selectedPdfs]);
    setPdfError(false);
  };
  const handleRemovePdf = (indexToRemove) => {
    setPdfs((prevPdfs) =>
      prevPdfs.filter((_, index) => index !== indexToRemove)
    );
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
      width: 200,
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
      width: 100,
      renderHeader: (params) => (
        <strong className=" text-md">{"Actions "}</strong>
      ),
      renderCell: (params) => (
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton
                  aria-label="view"
                  size="medium"
                  onClick={() => handleVisibilityClick(params.row)}
                >
                  <VisibilityIcon className="text-black" />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Detail</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton
                  aria-label="view"
                  size="medium"
                  onClick={() => handleDialogOpen(params.row)}
                >
                  <RiFileUploadLine className="text-black" />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload Agreement</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];
  const propertyRows = myProperties
    .sort((a, b) => b.createdAt - a.createdAt) // Sort properties by createdAt in descending order
    .map((item, index) => ({
      id: item._id,
      image: item.imageUrls[0],
      propertyType: item.PropertyType,
      status: item.Status,
      price: `${item.Price.toLocaleString()} ${item.Currency}`,
    }));

  const handleClick = async (formData) => {
    if (pdfs.length === 0) {
      setPdfError(true);
    }

    const formDataToSend = new FormData();
    formDataToSend.append("file", pdfs[0]);
    formDataToSend.append("sellerEmail", sellerEmail);
    formDataToSend.append("buyerEmail", buyerEmail);
    formDataToSend.append("Price", formData.Price);
    formDataToSend.append("Id", selectedProperty.id);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/docs/upload`,
        {
          method: "POST",
          body: formDataToSend,
          headers: {
            Authorization: `Bearer ${userData.user?.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.success) {
        showToastMessage("The Agreement Documeent is Sent Successfully");
        setTimeout(() => {
          router.push("/dashboard/broker/"); // Redirect to login page after a delay
        }, 3000); // Adjust the delay time as needed
      }
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/`,
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
        setUsers(data.response);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoadingProperties(false);
      }
    };
    fetchUserList();
  }, [userData.user?.token]);

  return (
    <>
      <Dialog className="w-2/5" open={isOpen} onClose={handleDialogClose}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Agreement Documents</DialogTitle>
            <DialogDescription>
              Upload Agreement Documents and Select a User From the List for
              whom the Documents is going to be Send
            </DialogDescription>
            <button
              className="absolute top-2 right-2 p-1 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
              onClick={handleDialogClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="mt-4">
              <label htmlFor="title" className="font-bold">
                Agreement Documents Between Seller and Buyer:
              </label>
              <div className="w-full rounded-lg border border-gray-300 p-4">
                <input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf"
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
                {pdfError && (
                  <p className="text-red-500 mt-2">
                    Please select at least one PDF file
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <label htmlFor="title" className="font-bold">
                Seller:
              </label>
              <select
                className="block appearance-none marker w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => handleSellerChange(e.target.value)}
              >
                <option value="" disabled>
                  Select option
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.Email}>
                    {`${user.FirstName} ${user.LastName},  ${user.Email}`}
                  </option>
                ))}
              </select>
              <label htmlFor="title" className="font-bold">
                Buyer:
              </label>
              <select
                className="block appearance-none marker w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => handleBuyerChange(e.target.value)}
              >
                <option value="" disabled>
                  Select option
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.Email}>
                    {`${user.FirstName} ${user.LastName},  ${user.Email}`}
                  </option>
                ))}
              </select>
            </div>
            <Label htmlFor="title" className="font-bold mt-1">
              Final Price:
            </Label>
            <Input
              type="number"
              id="price"
              placeholder="Price"
              className="w-44"
              {...register("Price")}
            />
            <p className="p-1 text-red-600 text-sm">{errors.Price?.message}</p>
          </div>
          <DialogFooter>
            <Button variant="login" onClick={handleSubmit(handleClick)}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
