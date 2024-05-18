"use client";
import Image from "next/image";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function Homepage() {
  const handleEdit = (id) => {
    // Handle edit operation
    console.log("Edit clicked for id:", id);
  };

  const handleDelete = (id) => {
    // Handle delete operation
    console.log("Delete clicked for id:", id);
  };
  const handleView = (id) => {
    // Handle delete operation
    router.push("/login"); // Redirect to login page after a delay
  };
  const getStatusCellStyle = (status) => {
    let style = {
      padding: "6px 12px",
      borderRadius: "4px",
      boxShadow: "none", // Reset box-shadow
      backgroundColor: "transparent", // Reset background-color
      color: "inherit", // Reset text color
    };

    // Apply styles based on status
    if (status === "Approved") {
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

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 300,
      headerAlign: "center",
      renderHeader: (params) => <strong>{"Image"}</strong>,
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
      field: "propertyInfo",
      headerName: "Property Title",
      width: 150,
      editable: false,
      headerAlign: "bold-header",
      renderHeader: (params) => <strong>{"Property Title"}</strong>,
      renderCell: (params) => (
        <div style={{ marginBottom: 100 }}>{params.value}</div>
      ),
    },
    {
      field: "addedOn",
      headerName: "Added On",
      width: 150,
      headerAlign: "bold-header",
      renderHeader: (params) => <strong>{"Added On "}</strong>,
      editable: false,
      renderCell: (params) => (
        <div style={{ paddingBottom: 100 }}>{params.value}</div>
      ),
    },

    {
      field: "status",
      headerName: "Status ",
      width: 150,
      editable: false,
      headerAlign: "bold-header",
      renderHeader: (params) => <strong>{"Status "}</strong>,
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
      editable: false,
      renderHeader: (params) => <strong>{"Price "}</strong>,
      renderCell: (params) => (
        <div style={{ paddingBottom: 100 }}>{params.value}</div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      renderHeader: (params) => <strong>{"Actions "}</strong>,

      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(params.id)}
            size="small"
            style={{ color: "green" }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.id)}
            size="small"
            style={{ color: "red" }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="view" onClick={handleView} size="small">
            <VisibilityIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      image: "/images/about.jpg",
      propertyInfo: "Apartment",
      addedOn: "23/2/2024",
      status: "Approved",
      price: "1,200,000",
    },
    {
      id: 2,
      image: "/images/about.jpg",
      propertyInfo: "Apartment",
      addedOn: "23/2/2024",
      status: "Rejected",
      price: "1,200,000",
    },
  ];
  const customStyles = {
    root: {
      "& .MuiDataGrid-colCell:focus-within": {
        outline: " none !important",
      },
    },
  };
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
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
          rows={rows}
          columns={columns.map((column) => ({
            ...column,
            headerClassName: "bold-header", // Apply bold-header class to header cells
          }))}
          rowHeight={230}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10]}
        />
      </div>
    </>
  );
}
export default Homepage;
