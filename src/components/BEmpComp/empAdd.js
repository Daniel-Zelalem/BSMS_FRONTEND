"use client";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { addemployee, showemployee } from "@/lib/emphelper";
import Success from "./successMsg";
import Image from "next/image";

const EmpAdd = () => {
  const [formData, setFormData] = useState({});
  const [empImageFile, setEmpImageFile] = useState(null);
  const [relImageFile, setRelImageFile] = useState(null);

  const queryClient = useQueryClient();

  const empAddMutation = useMutation(addemployee, {
    onSuccess: async () => {
      await queryClient.prefetchQuery("employees", showemployee);
      location.reload();
    },
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === "Phone" || name === "RelativePhone") {
      if (!/^09\d{8}$/.test(value) && !/^\+2519\d{8}$/.test(value)) {
        errorMessage =
          'Phone number must start  with "09" or "+2519" and have 10 to 13 digits';
      }
    }
    setFormData({ ...formData, [name]: value, error: errorMessage });
  };

  const handleEmpImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setEmpImageFile(imageUrl);
    setFormData({ ...formData, EmpAvatar: file });
  };

  const handleRelImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setRelImageFile(imageUrl);
    setFormData({ ...formData, RelAvatar: file });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      console.log("You Don't Have any Data");
      return;
    }
    empAddMutation.mutate(formData);
  };

  if (empAddMutation.isSuccess) {
    return (
      <Success message={"Congratulation! Emp Added Successfuly"}></Success>
    );
  }

  return (
    <>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white py-5 px-5 border border-gray-200 rounded-md"
        onSubmit={handleAddSubmit}
      >
        <section>
          <h1 className="text-xl  font-semibold mb-4 text-center">
            Add Workers Information
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
              onChange={handleEmpImage}
              className="sr-only"
              required
            />
            <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer mx-auto">
              {empImageFile ? (
                <img
                  src={empImageFile}
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
                label="Employee Experience"
                required
              />
            </Grid>
          </Grid>
        </section>
        <section>
          <h1 className="text-xl font-semibold mb-4 md:text-center">
            Add Relatives Information
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
              onChange={handleRelImage}
              className="sr-only"
              required
            />
            <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer mx-auto">
              {relImageFile ? (
                <img
                  src={relImageFile}
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
                label="There Relationship "
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
                name="Agent"
                onChange={handleInputChange}
                label="Agent FullName"
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
              className="flex justify-center  text-md h-30 w-20
                         bg-red-300 font-bold text-black px-12 py-2 border
                         rounded-md hover:bg-gray-600 hover:border-green-500 hover:text-white"
            >
              Create{" "}
              <span className="px-1">
                <BiPlus size={24} />
              </span>
            </button>
          </div>
        </section>
      </form>
    </>
  );
};

export default EmpAdd;
