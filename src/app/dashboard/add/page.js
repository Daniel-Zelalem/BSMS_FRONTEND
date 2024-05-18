"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const schema = yup.object().shape({
    Email: yup
      .string()
      .required("Email is required")
      .matches(emailRegex, "Invalid email format"),
    Password: yup.string().required("Password is required").min(8),
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

  const showToastMessage = () => {
    toast.success("Manager is Successfully Registered!", {
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
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/brokerAdminRegister`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.data) {
        showToastMessage();
        setTimeout(() => {
          router.push("/dashboard/manage");
        }, 3000);
      }
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="mx-auto my-auto mb-3" style={{ width: "45%" }}>
        <form
          className="grid grid-cols-1 gap-3 p-6 bg-white shadow-lg rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-6">
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="email">Email</Label>
              </div>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                {...register("Email")}
              />
              <p className="p-1 text-red-600 text-sm">
                {errors.Email?.message}
              </p>
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
              <p className="p-1 text-red-600 text-sm">
                {errors.Password?.message}
              </p>
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
              <p className="p-1 text-red-600 text-sm">
                {errors.confirmPassword?.message}
              </p>
            </div>
          </div>
          <Button type="submit" variant="login" className="w-full">
            Register
          </Button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
