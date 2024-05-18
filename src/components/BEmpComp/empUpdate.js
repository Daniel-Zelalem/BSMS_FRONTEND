"use client";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getEmployeeById, showemployee, updateemployee } from "@/lib/emphelper";
import Success from "./successMsg";
import Image from "next/image";

const EmpUpdate = ({ formId }) => {
  const [formData, setFormData] = useState({});
  const [empImage, setEmpImage] = useState(null);
  const [relImage, setRelImage] = useState(null);
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery(
    ["employees", formId],
    () => getEmployeeById(formId)
  );

  useEffect(() => {
    if (data) {
      setFormData(data);

      if (data.EmpAvatar) {
        setEmpImage(data.EmpAvatar);
      }
      if (data.RelAvatar) {
        setRelImage(data.RelAvatar);
      }
    }
  }, [data]);

  const UpdateMutation = useMutation(
    (newData) => updateemployee(formId, newData),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData("employees", (old) => [data]);
        queryClient.prefetchQuery("employees", showemployee);
        location.reload();
      },
    }
  );

  if (isLoading)
    return (
      <div
        className="text-center font-bold "
        style={{ marginTop: "50px", marginLeft: "30px", color: "green" }}
      >
        Loading !
      </div>
    );
  if (isError) return <div>Error !{error} </div>;

  const {
    FullName,
    Age,
    Gender,
    Phone,
    Address,
    JobType,
    Experience,
    RelativeName,
    RelativePhone,
    RelativeAddress,
    Relationship,
  } = data;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === "Phone" || name === "RelativePhone") {
      if (!/^09\d{8}$/.test(value) && !/^\+2519\d{8}$/.test(value)) {
        errorMessage =
          'Phone number must start  with "09" or "+2519" and have 10 to 13 digits';
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleEmpImageUpdate = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setEmpImage(imageUrl);
    setFormData({ ...formData, EmpAvatar: file });
  };

  const handleRelImageupdate = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setRelImage(imageUrl);
    setFormData({ ...formData, RelAvatar: file });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    UpdateMutation.mutate(formData);
  };

  if (UpdateMutation.isSuccess) {
    return <Success message={"Congratulation! Emp Updated Successfuly"} />;
  }

  return (
    <>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white py-5 px-5 border border-gray-200 rounded-md"
        onSubmit={handleUpdateSubmit}
      >
        <section>
          <h1 className="text-xl  font-semibold mb-4 text-center">
            Update Workers Information
          </h1>
          <label
            htmlFor="emp-upload-input"
            className="block mx-auto md:mx-0  md:mb-5"
          >
            <input
              id="emp-upload-input"
              type="file"
              name="EmpAvatar"
              accept="image/*"
              onChange={handleEmpImageUpdate}
              className="sr-only"
            />
            <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer mx-auto">
              {empImage ? (
                <img
                  src={empImage}
                  alt="Uploaded"
                  className="w-full h-full rounded-full"
                />
              ) : (
                <p className="text-gray-500">Emp_ID</p>
              )}
            </div>
          </label>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                name="FullName"
                onChange={handleInputChange}
                defaultValue={FullName}
                label="Employee FullName"
                required
                inputProps={{
                  pattern: "[A-Za-z ]+",
                  title: "Only alphabetic characters are allowed",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                name="Age"
                onChange={handleInputChange}
                defaultValue={Age}
                label="Employee Age"
                required
                inputProps={{
                  pattern: "[0-9]*",
                  title: "Only numbers are allowed",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                name="Gender"
                onChange={handleInputChange}
                defaultValue={Gender}
                label="Employee Gender"
                required
                inputProps={{
                  pattern: "[A-Za-z ]+",
                  title: "Only alphabetic characters are allowed",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                name="Phone"
                onChange={handleInputChange}
                defaultValue={Phone}
                label="Employee Phone"
                helperText={formData.error || ""}
                error={Boolean(formData.error)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                name="Address"
                onChange={handleInputChange}
                defaultValue={Address}
                label="Employee Address"
                required
                inputProps={{
                  pattern: "[A-Za-z ]+",
                  title: "Only alphabetic characters are allowed",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                name="JobType"
                onChange={handleInputChange}
                defaultValue={JobType}
                label="Employee JobType"
                required
                inputProps={{
                  pattern: "[A-Za-z ]+",
                  title: "Only alphabetic characters are allowed",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                name="Experience"
                onChange={handleInputChange}
                defaultValue={Experience}
                label="Employee Experience"
                required
              />
            </Grid>
          </Grid>
        </section>
        <section>
          <h1 className="text-xl font-semibold mb-4 md:text-center">
            Update Relatives Information
          </h1>
          <label
            htmlFor="rel-upload-input"
            className="block mx-auto md:mx-0  md:mb-5"
          >
            <input
              id="rel-upload-input"
              type="file"
              name="RelAvatar"
              accept="image/*"
              onChange={handleRelImageupdate}
              className="sr-only"
            />
            <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer mx-auto">
              {relImage ? (
                <img
                  src={relImage}
                  alt="Uploaded"
                  className="w-full h-full rounded-full"
                />
              ) : (
                <p className="text-gray-500">Rel_ID</p>
              )}
            </div>
          </label>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                name="RelativeName"
                onChange={handleInputChange}
                defaultValue={RelativeName}
                label="Relative FullName"
                required
                inputProps={{
                  pattern: "[A-Za-z ]+",
                  title: "Only alphabetic characters are allowed",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                name="RelativePhone"
                onChange={handleInputChange}
                defaultValue={RelativePhone}
                label="Relative PhoneNumber"
                helperText={formData.error || ""}
                error={Boolean(formData.error)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                name="RelativeAddress"
                onChange={handleInputChange}
                defaultValue={RelativeAddress}
                label="Relative Address"
                required
                inputProps={{
                  pattern: "[A-Za-z ]+",
                  title: "Only alphabetic characters are allowed",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                name="Relationship"
                onChange={handleInputChange}
                defaultValue={Relationship}
                label="There Relationship "
                required
                inputProps={{
                  pattern: "[A-Za-z ]+",
                  title: "Only alphabetic characters are allowed",
                }}
              />
            </Grid>
          </Grid>

          <div className="flex gap-5 justify-end mt-20">
            <button
              type="submit"
              className="flex justify-center items-center text-md h-30 w-20
                       bg-yellow-300 text-black font-bold px-12 py-2 border rounded-md hover:bg-gray-200
                       hover:border-gray-500 hover:text-blue"
            >
              Update{" "}
              <span className="px-1">
                <BiEditAlt size={24} />
              </span>
            </button>
          </div>
        </section>
      </form>
    </>
  );
};

export default EmpUpdate;
