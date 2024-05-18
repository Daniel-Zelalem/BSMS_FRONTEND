"use client";
import * as yup from "yup";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@/components/ui/button";
import { styled } from "@mui/material/styles";
import { BsPersonPlus } from "react-icons/bs";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { Input } from "@mui/material";

export default function DataTable() {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setAlertOpen] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [userIdToDelete, setUserIdToDelete] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState({
    lastName: "",
    firstName: "",
    status: "",
  });
  const [errorsf, setErrors] = React.useState({
    lastName: "",
    status: "",
  });
  const [selectedModal, setSelectedModal] = React.useState("");
  const [openEditModal, setOpenEditModal] = React.useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data.response);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/remove/${userId}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.success) {
        showToastMessage(data.message);
        fetchUsers();
      } else {
        showToastError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
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

    if (status === "Active") {
      style.backgroundColor = "#1ecab826";
      style.color = "green";
      style.boxShadow = "0 0 13px #1ecab80d";
    } else if (status === "Deactive") {
      style.backgroundColor = "#1ecab826";
      style.color = "red";
      style.boxShadow = "0 0 13px #f1646c0d";
    }

    return style;
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const handleDeleteUser = (userId) => {
    handleAlertClickOpen(); // Open the confirmation dialog
    setUserIdToDelete(userId); // Set the user ID to be deleted
  };

  const handleAlertClickOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  React.useEffect(() => {
    if (
      selectedUser.firstName != "" &&
      selectedUser.lastName != "" &&
      selectedUser.status != ""
    ) {
      setOpenEditModal(true);
    }
  }, [selectedUser]);

  const handleEdit = (user) => {
    setSelectedModal("Update");
    setSelectedUser(user); // Update selectedUser state with the user data
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const editUser = async (user) => {
    if (!errorsf.firstName && !errorsf.lastName && !errorsf.status) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/update/${user.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user), // Convert formData to JSON string
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.success) {
          showToastMessage(data.message);
          fetchUsers();
          handleCloseEditModal();
        } else {
          showToastError(data.message);
        }
        console.log("Success:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const columns = [
    {
      field: "no",
      headerName: "No",
      width: 30,
      renderHeader: (params) => <strong>{"No "}</strong>,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 120,
      renderHeader: (params) => <strong>{"First Name "}</strong>,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 120,
      renderHeader: (params) => <strong>{"Last Name "}</strong>,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderHeader: (params) => <strong>{"Email "}</strong>,
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
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderHeader: (params) => <strong>{"Actions "}</strong>,

      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(params.row)}
            size="small"
            style={{ color: "green" }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteUser(params.id)}
            size="small"
            style={{ color: "red" }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="view"
            onClick={() => handleView(params.id)}
            size="small"
          ></IconButton>
        </div>
      ),
    },
  ];

  const rows = users.map((item, index) => ({
    id: item._id,
    no: index + 1,
    firstName: item.FirstName,
    lastName: item.LastName,
    email: item.Email,
    status: item.Status,
  }));

  const handleClickOpen = () => {
    setSelectedModal("Add");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const addSchema = yup.object().shape({
    FirstName: yup
      .string()
      .required("First Name is required")
      .matches(/^[A-Za-z]+$/, "First Name must contain only characters"),
    LastName: yup
      .string()
      .required("Last Name is required")
      .matches(/^[A-Za-z]+$/, "Last Name must contain only characters"),
    Email: yup
      .string()
      .required("Email is required")
      .matches(emailRegex, "Invalid email format"),
    Password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?!.*\s).{8,}$/,
        "Password must be at least 8 characters long and should not contain spaces"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("Password"), null], "Passwords Does Not Match")
      .required("Confirm Password is required"),
  });

  const handleFirstNameChange = (event) => {
    setSelectedUser({
      ...selectedUser,
      firstName: event.target.value, // Update the lastName field of selectedUser
    });
    if (!event.target.value) {
      setErrors({
        ...errorsf,
        firstName: "First Name is required",
      });
    } else if (!/^[A-Za-z]+$/.test(event.target.value)) {
      setErrors({
        ...errorsf,
        firstName: "First Name must contain only characters",
      });
    } else {
      setErrors({
        ...errorsf,
        firstName: "",
      });
    }
  };
  const handleLastNameChange = (event) => {
    setSelectedUser({
      ...selectedUser,
      lastName: event.target.value, // Update the lastName field of selectedUser
    });
    if (!event.target.value) {
      setErrors({
        ...errorsf,
        lastName: "Last Name is required",
      });
    } else if (!/^[A-Za-z]+$/.test(event.target.value)) {
      setErrors({
        ...errorsf,
        lastName: "Last Name must contain only characters",
      });
    } else {
      setErrors({
        ...errorsf,
        lastName: "",
      });
    }
  };

  const handleStatusChange = (event) => {
    setSelectedUser({
      ...selectedUser,
      status: event.target.value, // Update the lastName field of selectedUser
    });
    if (!event.target.value) {
      setErrors({
        ...errorsf,
        status: "Status is required",
      });
    } else {
      setErrors({
        ...errorsf,
        status: "",
      });
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addSchema),
  });
  const router = useRouter();

  const showToastMessage = (msg) => {
    toast.success(msg, {
      position: "top-right",
    });
  };

  const showToastError = (msg) => {
    toast.error(msg, {
      position: "top-right",
    });
  };

  const onSubmit = async (formData) => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataToSend.append(key, formData[key]);
      }
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/userRegister`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      if (data.success) {
        showToastMessage(data.message);
        setTimeout(() => {
          reset({
            LastName: "",
            FirstName: "",
            Email: "",
            Password: "",
            confirmPassword: "",
          });
        }, 5000);
        fetchUsers();
        handleClose();
      } else {
        showToastError(data.message);
        setTimeout(() => {
          reset({
            LastName: "",
            FirstName: "",
            Email: "",
            Password: "",
            confirmPassword: "",
          });
        });
        handleClose();
      }
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="ml-12">
      <Button
        className="bg-green mb-2 hover:bg-green/85"
        onClick={handleClickOpen}
      >
        <BsPersonPlus size={22} />
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          className="font-bold"
        >
          Add New User
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-semibold">
                First Name:
              </Label>
              <div className="col-span-3">
                <Input
                  id="fname"
                  placeholder="First Name"
                  {...register("FirstName")}
                />
                <p className="p-1 text-xs text-red-600">
                  {errors.FirstName?.message}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-semibold">
                Last Name:
              </Label>
              <div className="col-span-3">
                <Input
                  id="lname"
                  placeholder="Last Name"
                  {...register("LastName")}
                />
                <p className="p-1 text-xs text-red-600">
                  {errors.LastName?.message}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-semibold">
                Email:
              </Label>
              <div className="col-span-3">
                <Input id="email" placeholder="Email" {...register("Email")} />
                <p className="p-1 text-xs text-red-600">
                  {errors.Email?.message}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pass" className="text-right font-semibold">
                Password:
              </Label>
              <div className="col-span-3">
                <Input
                  id="pass"
                  type="password"
                  placeholder="Password"
                  {...register("Password")}
                />
                <p className="p-1 text-xs text-red-600">
                  {errors.Password?.message}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="cpass"
                className="text-right col-span-2 font-semibold "
              >
                Confirm Password:
              </Label>
              <div className="col-span-3">
                <Input
                  id="cpass"
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
                <p className="p-1 text-xs text-red-600">
                  {errors.confirmPassword?.message}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            className="bg-green hover:bg-green/85"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <Dialog
        onClose={handleCloseEditModal}
        aria-labelledby="customized-dialog-title"
        open={openEditModal}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          className="font-bold"
        >
          Edit User
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseEditModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-semibold">
                First Name:
              </Label>
              <div className="col-span-3">
                <Input
                  id="fname"
                  placeholder="First Name"
                  value={selectedUser.firstName}
                  onChange={handleFirstNameChange}
                />
                {errorsf.firstName && (
                  <p className="p-1 text-xs text-red-600">
                    {errorsf.firstName}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-semibold">
                Last Name:
              </Label>
              <div className="col-span-3">
                <Input
                  id="lname"
                  placeholder="Last Name"
                  value={selectedUser.lastName}
                  onChange={handleLastNameChange}
                />
                {errorsf.lastName && (
                  <p className="p-1 text-xs text-red-600">{errorsf.lastName}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-semibold">
                Status:
              </Label>
              <select
                value={selectedUser.status}
                onChange={handleStatusChange}
                className="block appearance-none marker w-[180px] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="" disabled>
                  Select option
                </option>
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
              </select>
              {errorsf.status && (
                <p className="p-1 text-xs text-red-600">{errorsf.status}</p>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            className="bg-green hover:bg-green/85"
            onClick={() => editUser(selectedUser)}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAlert}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="text-sm font-bold text-black"
        >
          {"Are you sure to Delete user permanently?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleAlertClose();
              deleteUser(userIdToDelete);
            }}
            className="text-white  mt-2 px-6"
            style={{ backgroundColor: "red" }}
          >
            Yes
          </Button>
          <Button
            onClick={handleAlertClose}
            className="text-white  mt-2 px-6"
            style={{ backgroundColor: "green" }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ height: 520, width: "95%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          checkboxSelection
        />
      </div>
      <ToastContainer />
    </div>
  );
}
