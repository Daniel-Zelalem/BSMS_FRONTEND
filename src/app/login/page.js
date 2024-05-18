"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { login } from "@/redux/features/auth-slice";

const Login = () => {
  const dispatch = useDispatch();

  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;

  const schema = yup.object().shape({
    Email: yup
      .string()
      .required("Email is required")
      .matches(emailRegex, "Invalid email format"),
    Password: yup.string().required("Password is required").min(8),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const showToastMessage = (message, type) => {
    toast.success(message, {
      position: "top-right",
    });
  };
  const showToastError = (message) => {
    toast.error(message, {
      position: "top-right",
    });
  };

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/login`,
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
      // console.log(data);
      if (data.responseData.token) {
        if (data.responseData.user.Status === "Active") {
          showToastMessage("Login successful!");
          showToastMessage();
          setTimeout(() => {
            localStorage.setItem("token", data.responseData.token);
            dispatch(login(data.responseData));

            //For Chat Page
            localStorage.setItem(
              "currentUser",
              JSON.stringify(data.responseData.user)
            );
            if (data.responseData.user.Role === "Admin") {
              router.push("/dashboard/companies");
            } else if (data.responseData.user.Role === "BrokerAdmin") {
              router.push("/dashboard/brokermanager");
            } else if (data.responseData.user.Role === "User") {
              router.push("/home");
            } else if (data.responseData.user.Role === "Broker") {
              router.push("/dashboard/broker");
            }
          }, 1500);
        } else if (data.responseData.user.Status === "Deactive") {
          showToastError("User Status is Deactive");
        }
      } else {
        showToastError("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Error:", error);
      showToastError("Invalid Email or Password");
    }
  };

  return (
    <>
      <div className="mx-auto w-1/4 my-auto mt-24 ">
        <form
          className="grid grid-cols-1 gap-6 p-6 bg-white shadow-2xl rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-semibold mx-auto">Sign In</h1>
          <div className="w-full">
            <div className="mb-3">
              <Label htmlFor="email">Email</Label>
            </div>
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
            <div className="mb-3">
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
            <Button
              type="submit"
              variant="login"
              className="w-full text-1xl font-semibold text-white hover:bg-green/80"
            >
              Login
            </Button>
          </div>
          <div className="flex justify-end">
            <Link href="/forgetpassword">
              <p className="text-red-600 text-sm">Forgot Password?</p>
            </Link>
          </div>

          <p className="flex justify-center md:flex-col lg:flex-row ">
            Do not have an account?
            <Link href="/register">
              <span className="font-bold ml-1 mb-1 text-green"> SignUp</span>
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
