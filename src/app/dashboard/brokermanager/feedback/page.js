"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextareaAutosize,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  {
    field: "feedback",
    headerName: "Feedback",
    width: 400,
    renderCell: (params) => (
      <TextareaAutosize
        value={params.row.feedback}
        style={{
          width: "100%",
          minHeight: "50px",
          maxHeight: "200px",
          resize: "none",
          overflow: "hidden",
        }}
        disabled
      />
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderHeader: (params) => <strong>{"Actions "}</strong>,
    renderCell: (params) => (
      <div>
        <IconButton
          aria-label="edit"
          onClick={() => handleEdit(params.row.id)}
          size="small"
          style={{ color: "green" }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => handleDelete(params.row.id)}
          size="small"
          style={{ color: "red" }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="view"
          onClick={() => handleView(params.row.id)}
          size="small"
        >
          <VisibilityIcon />
        </IconButton>
      </div>
    ),
  },
];

const rows = [
  {
    id: 1,
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet massa id diam elementum, a aliquet metus fermentum. Integer nec nisi sed mauris ultricies aliquet.",
  },
  {
    id: 2,
    feedback:
      "Sed efficitur nisi et lectus condimentum, quis auctor urna fringilla. Ut auctor, justo a convallis venenatis, lacus magna commodo enim, auctor fermentum nunc enim et justo.",
  },
  {
    id: 3,
    feedback:
      "Vestibulum tristique magna nec magna malesuada pharetra. Donec luctus feugiat massa, et tempus libero faucibus a.",
  },
  {
    id: 4,
    feedback:
      "Nulla facilisi. Vivamus vehicula elit eu arcu interdum rhoncus. Sed ac nisi est. Sed sit amet nisl non nisi pellentesque varius.",
  },
];

export default function DataTable() {
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedFeedback, setSelectedFeedback] = React.useState(null);

  const handleEdit = (id) => {
    const feedback = rows.find((row) => row.id === id);
    setSelectedFeedback(feedback);
    setOpenEditModal(true);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log("Delete feedback with ID:", id);
  };

  const handleView = (id) => {
    // Implement view functionality
    console.log("View feedback with ID:", id);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleSaveEditModal = () => {
    // Implement save functionality
    console.log("Saving changes:", selectedFeedback);
    setOpenEditModal(false);
  };

  return (
    <div className="ml-12">
      <div style={{ height: 520, width: "95%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          disableRowSelectionOnClick
          checkboxSelection
        />
      </div>
    </div>
  );
}
