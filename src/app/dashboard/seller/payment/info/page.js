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
  const schema = yup.object().shape({
    Name: yup.string().required("Account Owner Name is required"),
    Number: yup
      .number()
      .typeError("Account Number required and must be a number")
      .required("Account Number")
      .test(
        "is-positive",
        "Account Number must be a positive number",
        (value) => parseFloat(value) > 0
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  console.log(router.query);

  const showToastMessage = (msg) => {
    toast.success(msg, {
      position: "top-right",
    });
  };

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/payment/transfer`,
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
        showToastMessage(data.message);
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
                <Label htmlFor="email" className="font-bold">
                  Account Owner Full Name:
                </Label>
              </div>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                {...register("Name")}
              />
              <p className="p-1 text-red-600 text-sm">{errors.Name?.message}</p>
            </div>
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="email" className="font-bold">
                  Account Number:
                </Label>
              </div>
              <Input
                type="text"
                id="account"
                name="account"
                placeholder="Account Number"
                {...register("Number")}
              />
              <p className="p-1 text-red-600 text-sm">
                {errors.Number?.message}
              </p>
              <div className="mb-2">
                <Label htmlFor="Area" className="font-bold">
                  Amount :
                </Label>
                <Input
                  type="number"
                  id="Area"
                  value={price}
                  disabled
                  className="mt-3 w-44"
                />
              </div>
            </div>
          </div>
          <Button type="submit" variant="login" className="w-full">
            Withdraw
          </Button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
