"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function DataTable() {
  const property = useSelector((state) => state.setPropertyInfo.value);
  const [broker, setBroker] = React.useState([]);

  const showToastMessage = (message, type) => {
    console.log(message);
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

  React.useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/broker`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setBroker(data.users);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        //setLoadingProperties(false);
      }
    };
    fetchUserList();
  }, []);

  const columns = [
    {
      field: "no",
      headerName: "No",
      width: 70,
      renderHeader: (params) => <strong className=" text-md">{"No "}</strong>,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
      renderHeader: (params) => (
        <strong className=" text-md">{"First Name"}</strong>
      ),
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
      renderHeader: (params) => (
        <strong className=" text-md">{"Last Name "}</strong>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderHeader: (params) => (
        <strong className=" text-md">{"Email "}</strong>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      renderHeader: (params) => (
        <strong className="text-md">{"Action "}</strong>
      ),

      renderCell: (params) => (
        <div>
          <Button
            className="ml-2 bg-green hover:bg-green/90"
            onClick={() => handleAssign(params.row)}
          >
            Assign
          </Button>
        </div>
      ),
    },
  ];

  const rows = broker.map((item, index) => ({
    id: item._id,
    no: index + 1,
    firstName: item.FirstName,
    lastName: item.LastName,
    email: item.Email,
  }));

  const handleAssign = async (broker) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/${property.propType}/assign/${property.id}/${broker.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      if (res.success) {
        showToastMessage(res.message);
        showToastMessage();
        triggerNotificationToBroker(broker.email);
      } else {
        showToastError("Invalid email or password!");
      }
    } catch (error) {
      console.error("Error:", error);
      showToastError("An error occurred. Please try again.");
    }
  };
  const triggerNotificationToBroker = async (brokerEmail) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Notification/sendPropertyAssignmentNotification/${brokerEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      if (res.success) {
        console.log("Notification sent to broker");
      } else {
        console.error("Failed to send notification to broker");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="ml-12">
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
export default DataTable;
