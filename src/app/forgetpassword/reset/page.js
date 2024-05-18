"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Forgot = () => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;

  const schema = yup.object().shape({
    Email: yup
      .string()
      .required("Email is required")
      .matches(emailRegex, "Invalid email format"),
    token: yup.string().required("Password is required").min(8),
    newPassword: yup.string().required("Password is required").min(8),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/resetpass`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="mx-auto w-1/4 my-auto mt-24 ">
        <form
          className="grid grid-cols-1 gap-6 p-6 bg-white shadow-2xl rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-semibold mx-auto">Reset Password</h1>
          <h1 className="text-sm font-light mx-auto">
            Enter Your Email Address and Token to reset your password.
          </h1>
          <div className="w-full">
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              {...register("Email")}
            />
            <p className="p-1 text-red-600">{errors.Email?.message}</p>
          </div>
          <div className="w-full">
            <Input
              type="text"
              id="token"
              name="token"
              placeholder="Reset Token"
              {...register("token")}
            />
            <p className="p-1 text-red-600">{errors.Email?.message}</p>
          </div>
          <div className="w-full">
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="New Password"
              {...register("newPassword")}
            />
            <p className="p-1 text-red-600">{errors.Password?.message}</p>
          </div>
          <div className="w-full">
            <Button
              type="submit"
              variant="login"
              className="w-full text-1xl font-semibold text-white hover:bg-green/80"
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Forgot;
