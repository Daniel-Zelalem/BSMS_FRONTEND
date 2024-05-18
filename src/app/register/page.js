"use client";
import React, { useState } from "react";
import * as yup from "yup";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaCamera } from "react-icons/fa";
import { loadProfile } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const Register = () => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;

  const schema = yup.object().shape({
    FirstName: yup
      .string()
      .required("First Name is required")
      .matches(/^[A-Za-z]+$/, "First Name must contain only characters"),
    LastName: yup
      .string()
      .required("Last Name is required")
      .matches(/^[A-Za-z]+$/, "Last Name must contain only characters"),
    Phone: yup
      .string()
      .required("Phone Number is required")
      .matches(/^9\d{8}$/, "Phone Number must start with 9 and 9 numbers long"),
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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

  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file); // Get URL of the selected file

    setImage(imageUrl); // Set the image URL in component state
    dispatch(loadProfile(imageUrl)); // Dispatch the image URL to Redux store
    setFile(file); // Set the file object in component state
  };

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Phone: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const handleChange = () => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (formData) => {
    console.log(process.env.NEXT_PUBLIC_BSMS_BACKEND_URL);
    const formDataToSend = new FormData();

    // Append each key-value pair from original formData
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Append images with file as key-value pairs
    formDataToSend.append("images", file);
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
      if (data.success) {
        showToastMessage(data.message);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        showToastError(data.message);
      }
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="mx-auto my-auto mb-3 mt-2" style={{ width: "45%" }}>
        <form
          className="grid grid-cols-1 gap-3 p-6 bg-white shadow-lg rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" mx-auto ">
            <h1 className="text-2xl font-semibold mx-auto mb-1 ml-1">
              Sign Up
            </h1>
            <label htmlFor="upload-input" className="relative mx-auto">
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
              <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer">
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <FaCamera className="text-gray-500 w-12 h-12" />
                )}
              </div>
            </label>
          </div>
          <span className="mx-auto mb-2"> Upload Profile Image</span>
          <div className="grid grid-cols-2 gap-6">
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="FirstName">First Name</Label>
              </div>
              <Input
                type="text"
                id="FirstName"
                name="FirstName"
                placeholder="First Name"
                {...register("FirstName")}
              />
              <p className="p-1 text-red-600">{errors.FirstName?.message}</p>
            </div>
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="LastName">Last Name</Label>
              </div>
              <Input
                type="text"
                id="LastName"
                name="LastName"
                placeholder="Last Name"
                {...register("LastName")}
              />
              <p className="p-1 text-red-600">{errors.LastName?.message}</p>
            </div>
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
              </div>
              <div className="flex">
                <Input
                  disabled
                  type="tel"
                  placeholder="+251"
                  className="w-16 font-bold  placeholder"
                />
                <Input
                  type="number"
                  id="Phone"
                  name="Phone"
                  placeholder="Phone Number"
                  {...register("Phone")}
                />
              </div>
              <p className="p-1 text-red-600">{errors.Phone?.message}</p>
            </div>
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="email">Email</Label>
              </div>
              <Input
                type="Email"
                id="Email"
                name="Email"
                placeholder="Email"
                {...register("Email")}
              />
              <p className="p-1 text-red-600">{errors.Email?.message}</p>
            </div>
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                {...register("Password")}
              />
              <p className="p-1 text-red-600">{errors.Password?.message}</p>
            </div>
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
              </div>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              <p className="p-1 text-red-600">
                {errors.confirmPassword?.message}
              </p>
            </div>
          </div>
          <Button type="submit" variant="login" className="w-full">
            <span className="text-veryDarkBlue font-extrabold text-1xl">
              Sign Up
            </span>
          </Button>

          <p className="flex justify-center md:flex-col lg:flex-row ">
            Do have an account?
            <Link href="/login">
              <span className="font-bold ml-1 text-green"> Login</span>
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
