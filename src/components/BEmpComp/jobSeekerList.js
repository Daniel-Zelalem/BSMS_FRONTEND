"use client";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { showemployee } from "@/lib/emphelper";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

const JobSeekerTable = () => {
  const { isLoading, isError, data, error } = useQuery(
    "employees",
    showemployee
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await showemployee();
        dispatch({ type: "FETCH_EMPLOYEES_SUCCESS", payload: responseData });
      } catch (error) {
        dispatch({ type: "FETCH_EMPLOYEES_FAILURE", payload: error.message });
      }
    };

    fetchData();
  }, [dispatch]);

  if (isLoading)
    return (
      <div
        className="text-center font-bold "
        style={{ marginTop: "50px", marginLeft: "30px", color: "green" }}
      >
        Loading Please wait...
      </div>
    );
  if (isError) return <div>Error{error}</div>;

  const EmpHeader = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
      renderHeader: (params) => <strong className=" text-md">{"ID"}</strong>,
    },
    {
      field: "FullName",
      headerName: "FullName",
      width: 140,
      renderHeader: (params) => (
        <strong className=" text-md">{"FullName"}</strong>
      ),
    },
    {
      field: "Age",
      headerName: "Age",
      width: 40,
      renderHeader: (params) => <strong className=" text-md">{"Age"}</strong>,
    },
    {
      field: "Gender",
      headerName: "Gender",
      width: 70,
      renderHeader: (params) => (
        <strong className=" text-md">{"Gender"}</strong>
      ),
    },
    {
      field: "Address",
      headerName: "Address",
      width: 130,
      renderHeader: (params) => (
        <strong className=" text-md">{"Address"}</strong>
      ),
    },
    {
      field: "JobType",
      headerName: "JobType",
      width: 130,
      renderHeader: (params) => (
        <strong className=" text-md">{"JobType"}</strong>
      ),
    },
    {
      field: "Experience",
      headerName: "Experience",
      width: 130,
      renderHeader: (params) => (
        <strong className=" text-md">{"Experience"}</strong>
      ),
    },
    {
      field: "RelativeName",
      headerName: "RelativeName",
      width: 140,
      renderHeader: (params) => (
        <strong className=" text-md">{"RelativeName"}</strong>
      ),
    },
    {
      field: "RelativeAddress",
      headerName: "RelativeAddress",
      width: 140,
      renderHeader: (params) => (
        <strong className=" text-md">{"RelativeAddress"}</strong>
      ),
    },
    {
      field: "Relationship",
      headerName: "Relationship",
      width: 130,
      renderHeader: (params) => (
        <strong className=" text-md">{"Relationship"}</strong>
      ),
    },
    {
      field: "Agent",
      headerName: "Agent",
      width: 130,
      renderHeader: (params) => <strong className=" text-md">{"Agent"}</strong>,
    },
  ];
  const EmpList = data.response.map((empObj, index) => ({
    ...empObj,
    id: empObj._id,
    id: index + 1,
  }));

  return (
    <div style={{ width: "97%", height: "auto", marginLeft: 20 }}>
      <DataGrid
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
        rows={EmpList}
        columns={EmpHeader}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        //checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default JobSeekerTable;
