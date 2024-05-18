"use client";
import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Hero.css";
import Link from "next/link";

const Hero = () => {
  const btnStyle = {
    color: "black",
    border: "2px solid rgb(0, 167, 111)",
    marginRight: "6px",
    textTransform: "capitalize",
    fontWeight: "bold",
  };

  const schema = yup.object().shape({
    minPrice: yup
      .number()
      .typeError("Price required and must be a number")
      .test(
        "is-positive",
        "Price must be a positive number",
        (value) => parseFloat(value) > 0
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Use Yup resolver for React Hook Form
  });

  const onSubmit = (data) => {
    console.log(data); // Do something with the form data
  };

  return (
    <>
      <section className="hero sm:mb-24">
        <div className="container">
          <h1 className="text-white text-3xl font-medium">
            Find <span className="text-green pt-10">Properties </span>
            That Suits You.
          </h1>
          <form className="flex" onSubmit={handleSubmit()}>
            <div className="box">
              <span className="text-black font-bold">City</span>
              <select className="equal-size-select ">
                <option value="All" className="opt">
                  All City
                </option>
                <option value="Addis Ababa">Addis Ababa</option>
                <option value="Adama">Adama</option>
                <option value="Jimma">Jimma</option>
                <option value="Debre Birhan">Debre Birhan</option>
                <option value="Ambo">Ambo</option>
                <option value="Bishoftu">Bishoftu</option>
                <option value="Wolkite">Wolkite</option>
              </select>
            </div>
            <div className="box">
              <span className="text-black font-bold">Contract Type</span>
              <select className="equal-size-select ">
                <option value="All">All Type</option>
                <option value="Sale">For Sale</option>
                <option value="Rent">For Rent</option>
              </select>
            </div>
            <div className="box">
              <span className="text-black font-bold">Property Category</span>
              <select className="equal-size-select ">
                <option value="All">All Properties</option>
                <option value="House">House</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Land">Land</option>
              </select>
            </div>
            <div className="box">
              <span className="text-black font-bold">Currency</span>
              <select className="equal-size-select ">
                <option value="All">All</option>
                <option value="ETB">ETB</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div className="box">
              <span className="text-black font-bold block">Price</span>
              <input
                className="price-input "
                type="number"
                placeholder="Price"
                {...register("minPrice")}
              />
              <div>
                <p className="p-1 text-red-600 text-sm">
                  {errors.minPrice?.message}
                </p>
              </div>
            </div>
            <Link href="/listings">
              <button className="flex items-center justify-center bg-green rounded h-10 mt-10 pr-2 ">
                <span className="ml-2  text-black font-bold hover:text-white">
                  Search
                </span>
              </button>
            </Link>

            <button
              className="flex items-center justify-center rounded h-10 mt-10 pr-2 ml-2 hover:bg-green "
              style={btnStyle}
            >
              <span className="ml-2  text-black font-bold text-center hover:text-white">
                Clear
              </span>
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Hero;
