"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { IoIosArrowBack } from "react-icons/io";

const Forgot = () => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;

  const schema = yup.object().shape({
    Email: yup
      .string()
      .required("Email is required")
      .matches(emailRegex, "Invalid email format"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/forgotpassword`,
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
      if (data.success) {
        router.push("/forgetpassword/reset");
      }
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
          <h1 className="text-2xl font-semibold mx-auto">Forgot Password</h1>
          <h1 className="text-sm font-light mx-auto">
            Enter Your Email Address and we will send you instruction to reset
            your password.
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
            <Button
              type="submit"
              variant="login"
              className="w-full text-1xl font-semibold text-white hover:bg-green/80"
            >
              Send
            </Button>
          </div>
          <Link href="/login" className="flex flex-row">
            <div className="flex items-center">
              <IoIosArrowBack className="text-green mb-1" />
              <span className="font-bold ml-1 mb-1 text-green">
                Back to Log In
              </span>
            </div>
          </Link>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Forgot;
