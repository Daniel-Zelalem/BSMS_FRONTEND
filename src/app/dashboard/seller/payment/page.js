"use client";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const Payement = () => {
  const [doc, setDoc] = React.useState(null);
  const [userData, setUserData] = React.useState({});
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

  const showToastMessage = (msg) => {
    toast.success(msg, {
      position: "top-right",
    });
  };

  const router = useRouter();
  const onSubmit = async (formData) => {
    formData.Price = doc.price - doc.price * (2 / 100);
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
      console.log(data);
      if (data.success) {
        showToastMessage(data.message);
        setTimeout(() => {
          router.push("/dashboard/seller");
        }, 1500);
      }
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData || {});
  }, []);

  const userToken = userData.user ? userData.token : "";
  React.useEffect(() => {
    if (userToken) {
      const fetchDocs = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/docs/getDocs`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setDoc(data.data[0]);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchDocs();
    }
  }, [userToken]);

  return (
    <>
      {doc && doc.paymentWithdraw === "Not Done" && (
        <>
          <div className="mx-auto my-auto mb-3" style={{ width: "45%" }}>
            <div className="container flex flex-row items-end gap-2">
              <p className="text-green text-2xl font-semibold">Balance : </p>
              <p className="text-veryDarkBlue text-2xl">{`${(
                doc.price -
                doc.price * (2 / 100)
              ).toLocaleString()}`}</p>
            </div>
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
                  <p className="p-1 text-red-600 text-sm">
                    {errors.Name?.message}
                  </p>
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
                  <div className="mb-2 mt-2">
                    <Label htmlFor="Area" className="font-bold mb-1">
                      Amount :
                    </Label>
                    <Input
                      type="number"
                      id="Area"
                      value={doc.price - doc.price * (2 / 100).toLocaleString()}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="container mt-4">
                <Button className="bg-green hover:bg-green/65 ">
                  Withdraw
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
      {!doc && (
        <>
          <div className="flex justify-center mt-6">
            <p className=" text-1xl font-bold">
              No Payment Available To Process Transaction
            </p>
          </div>
        </>
      )}
      {doc && doc.paymentWithdraw === "Done" && (
        <>
          <div className="flex justify-center mt-6">
            <p className=" text-1xl font-bold">
              No Payment Available To Process Transaction
            </p>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default Payement;
