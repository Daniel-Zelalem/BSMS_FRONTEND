"use client";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Map from "@/components/Maps/Map";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setAmount } from "@/redux/features/auth-slice";
import Image from "next/image";

function Homepage() {
  const [propertyType, setPropertyType] = useState("House");
  const [ContractType, setContractTypee] = useState("sale");
  const [selectedColor, setSelectedColor] = useState("");
  const [location, setLocation] = useState(null);
  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [pdfError, setPdfError] = useState(false); // State to track PDF selection
  const [imageError, setImageError] = useState(false); // State to track PDF selection
  const [userData, setUserData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData || {});
  }, []);
  const dispatch = useDispatch();

  //For Notification
  const Role = "BrokerAdmin";
  const currentYear = new Date().getFullYear();

  const Houseschema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .matches(
        /^(?=.*[a-zA-Z])[a-zA-Z0-9]+(?:[ _-][a-zA-Z0-9]+)*$/,
        "Title must contain at least one letter and may include numbers, spaces, underscores, or hyphens"
      ),
    description: yup
      .string()
      .required("Description is required")
      .matches(
        /^(?=.*[a-zA-Z])[a-zA-Z0-9]+(?:[ _-][a-zA-Z0-9]+)*$/,
        "Description must contain at least one letter and may include numbers, spaces, underscores, or hyphens"
      ),
    ContractType: yup.string().required("Contract Type is required"),
    propertyType: yup.string().required("Property Type is required"),
    Color: yup.string().required("Color is required"),
    Currency: yup.string().required("Currency is required"),
    City: yup.string().required("City is required"),
    Brand: yup.string().required("Brand is required"),
    FuelType: yup.string().required("Fuel Type is required"),
    BodyType: yup.string().required("Body Type is required"),
    PriceCategory: yup.string().required("Price Category is required"),
    PricePrefix: yup.string().required("Price Prefix is required"),
    Mileage: yup
      .number()
      .typeError("Mileage required and must be a number")
      .required("Mileage is required")
      .test(
        "is-positive",
        "Mileage must be a positive number",
        (value) => parseFloat(value) > 0
      ),
    Price: yup
      .number()
      .typeError("Price required and must be a number")
      .required("Price is required")
      .test(
        "is-positive",
        "Price must be a positive number",
        (value) => parseFloat(value) > 0
      ),
    Year: yup
      .number()
      .typeError("Year required and must be a number")
      .required("Year is required")
      .test(
        "is-positive",
        "Year must be a positive number",
        (value) => parseFloat(value) > 0
      )
      .test(
        "is-valid-year",
        "Year must be between 1990 and current year",
        (value) => value >= 1990 && value <= currentYear
      ),
  });

  const vehicleSchema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .matches(
        /^(?=.*[a-zA-Z])[a-zA-Z0-9]+(?:[ _-][a-zA-Z0-9]+)*$/,
        "Title must contain at least one letter and may include numbers, spaces, underscores, or hyphens"
      ),
    description: yup
      .string()
      .required("Description is required")
      .matches(
        /^(?=.*[a-zA-Z])[a-zA-Z0-9]+(?:[ _-][a-zA-Z0-9]+)*$/,
        "Description must contain at least one letter and may include numbers, spaces, underscores, or hyphens"
      ),
    ContractType: yup.string().required("Contract Type is required"),
    propertyType: yup.string().required("Contract Type is required"),
    Currency: yup.string().required("Currency is required"),
    City: yup.string().required("City is required"),
    Bedrooms: yup
      .number()
      .typeError("Bedrooms required and must be a number")
      .required("Bedrooms is required")
      .test(
        "is-positive",
        "Bedrooms must be a positive number",
        (value) => parseFloat(value) >= 0
      ),
    PriceCategory: yup.string().required("Price Category is required"),
    Bathrooms: yup
      .number()
      .typeError("Bathrooms required and must be a number")
      .required("Bathrooms is required")
      .test(
        "is-positive",
        "Bathrooms must be a positive number",
        (value) => parseFloat(value) > 0
      ),
    Price: yup
      .number()
      .typeError("Price required and must be a number")
      .required("Price is required")
      .test(
        "is-positive",
        "Price must be a positive number",
        (value) => parseFloat(value) > 0
      ),
    PricePrefix: yup.string(),

    Area: yup
      .number()
      .typeError("Area required and must be a number")
      .required("Area is required")
      .test(
        "is-positive",
        "Area must be a positive number",
        (value) => parseFloat(value) > 0
      ),
    AreaPrefix: yup.string(),
  });

  const landSchema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .matches(
        /^(?=.*[a-zA-Z])[a-zA-Z0-9]+(?:[ _-][a-zA-Z0-9]+)*$/,
        "Title must contain at least one letter and may include numbers, spaces, underscores, or hyphens"
      ),
    description: yup
      .string()
      .required("Description is required")
      .matches(
        /^(?=.*[a-zA-Z])[a-zA-Z0-9]+(?:[ _-][a-zA-Z0-9]+)*$/,
        "Description must contain at least one letter and may include numbers, spaces, underscores, or hyphens"
      ),
    ContractType: yup.string().required("Contract Type is required"),
    propertyType: yup.string().required("Contract Type is required"),
    Currency: yup.string().required("Currency is required"),
    City: yup.string().required("City is required"),
    PriceCategory: yup.string().required("Price Category is required"),
    Price: yup
      .number()
      .typeError("Price required and must be a number")
      .required("Price is required")
      .test(
        "is-positive",
        "Price must be a positive number",
        (value) => parseFloat(value) > 0
      ),
    PricePrefix: yup.string(),

    Area: yup
      .number()
      .typeError("Area required and must be a number")
      .required("Area is required")
      .test(
        "is-positive",
        "Area must be a positive number",
        (value) => parseFloat(value) > 0
      ),
    AreaPrefix: yup.string(),
  });

  const schema = (propertyType) => {
    if (propertyType === "House") {
      return vehicleSchema;
    } else if (propertyType === "Vehicle") {
      return Houseschema;
    } else return landSchema;
  };

  const selectedSchema = schema(propertyType);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(selectedSchema),
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    PropretyType: "",
    Brand: "",
    Model: "",
    Transmission: "",
    BodyType: "",
    FuelType: "",
    Mileage: "",
    ContractType: "",
    Year: 1,
    Color: "",
    Currency: "",
    City: "",
    PriceCategory: "",
    Price: "",
    PricePrefix: "",
    Bedrooms: "",
    Bathrooms: "",
    Area: "",
    AreaPrefix: "",
  });

  const handleLocationChange = ({ lat, lng }) => {
    setLocation({ lat, lng });
    console.log({ lat, lng });
  };

  const showToastMessage = (message, type) => {
    console.log(message);
    toast.success(message, {
      position: "top-right",
    });
  };
  const showToastError = (message) => {
    toast.error(message, {
      position: "top-right",
    });
  };

  function calculateListingFee(propertyType, ContractType) {
    const pricingStructure = {
      House: {
        sale: 500,
        rent: 300,
      },
      Vehicle: {
        sale: 300,
        rent: 200,
      },
      Land: {
        sale: 1000,
        rent: 500,
      },
    };

    const fee = pricingStructure[propertyType][ContractType];
    dispatch(setAmount(fee));
    router.push("/checkout");
  }

  const Payment = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/payment/pay`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      router.push(res.data.data.checkout_url);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    if (pdfs.length === 0) {
      setPdfError(true);
      if (images.length === 0) {
        setImageError(true);
      }
    }
    if (images.length === 0) {
      setImageError(true);
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataToSend.append(key, formData[key]);
      }
    }

    images.forEach((image, index) => {
      formDataToSend.append("images[]", image);
    });
    formDataToSend.append("documents[]", pdfs[0]);
    const locationString = JSON.stringify(location);
    formDataToSend.append("Location", locationString);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/${propertyType}/upload`,
        {
          method: "POST",
          body: formDataToSend,
          headers: {
            Authorization: `Bearer ${userData.token}`, // Assuming your token is named `token`
          },
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
          router.push("/dashboard/seller/properties"); // Redirect to login page after a delay
        }, 1000); // Adjust the delay time as needed
      }
      //reigire notification to BrokerAdmin
      triggerNotificationToBrokerAdmin(Role);
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const triggerNotificationToBrokerAdmin = async (brokerAdminRole) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Notification/sendPropertyRegistrationNotification/${brokerAdminRole}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      if (res.success) {
        console.log("Notification sent to broker");
      } else {
        console.error("Failed to send notification to broker");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const colors = [
    { name: "Red", value: "#FF0000" },
    { name: "Green", value: "#00FF00" },
    { name: "Blue", value: "#0000FF" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Purple", value: "#800080" },
    { name: "Black", value: "#000" },
    { name: "White", value: "#FFF" },
    { name: "Mix", value: "    #4F1396" },
  ];
  const handlePdfChange = (event) => {
    const selectedPdfs = Array.from(event.target.files);
    setPdfs((prevPdfs) => [...prevPdfs, ...selectedPdfs]);
    setPdfError(false);
  };
  const handleRemovePdf = (indexToRemove) => {
    setPdfs((prevPdfs) =>
      prevPdfs.filter((_, index) => index !== indexToRemove)
    );
  };
  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...selectedImages]);
    setImageError(false);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };
  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };
  const handlePropertyTypeChange = (value) => {
    setPropertyType(value);
  };
  const handleContractTypeChange = (value) => {
    setContractTypee(value);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white shadow-2xl rounded-lg px-8  mb-4"
      >
        <div className="mb-2">
          <Label htmlFor="title" className="font-bold ">
            Property Title :
          </Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            {...register("title")}
            className="mt-2"
          />
          <p className="p-1 text-red-600 text-sm">{errors.title?.message}</p>
        </div>
        <div className="mb-2">
          <Label htmlFor="location" className="font-bold">
            Property Location :
          </Label>
          <Map height="350px" width="100%" onClick={handleLocationChange} />
        </div>
        <div className="mb-3">
          <Label htmlFor="location" className="font-bold">
            Property Description :
          </Label>
          <Textarea
            placeholder="Type your property Description here."
            className="mt-3"
            {...register("description")}
          />
          <p className="p-1 text-red-600 text-sm">
            {errors.description?.message}
          </p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div>
            <div className="mb-4">
              <Label htmlFor="type" className="font-bold">
                Proprety Type :
              </Label>
            </div>
            <select
              {...register("propertyType")}
              className="block appearance-none marker w-[180px] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={(e) => handlePropertyTypeChange(e.target.value)}
            >
              <option value="" disabled>
                Select option
              </option>
              <option value="House">House</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Land">Land</option>
            </select>
            <p className="p-1 text-red-600 text-sm">
              {errors.propertyType?.message}
            </p>
          </div>
          {propertyType === "House" && (
            <div>
              <div className="mb-4">
                <Label htmlFor="type" className="font-bold">
                  Property Category :
                </Label>
              </div>
              <select
                {...register("PropertyCategory")}
                className="block appearance-none w-[180px] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="" disabled>
                  Select option
                </option>
                <option value="Villa">Villa</option>
                <option value="Condominium">Condominium</option>
                <option value="Apartment">Apartment</option>
                <option value="Office">Office</option>
                <option value="Studio">Studio</option>
                <option value="Single Familiy">Single Familiy</option>
              </select>
              <p className="p-1 text-red-600 text-sm">
                {errors.PropertyCategory?.message}
              </p>
            </div>
          )}
          {propertyType === "Vehicle" && (
            <div>
              <div className="mb-4">
                <Label htmlFor="type" className="font-bold">
                  Brand :
                </Label>
              </div>
              <select
                {...register("Brand")}
                className="block appearance-none marker w-[180px] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="" disabled>
                  Select option
                </option>
                <option value="Toyota">Toyota</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Scania">Scania</option>
                <option value="Renault">Renault</option>
                <option value="Jetour">Jetour</option>
                <option value="Scania">Scannia</option>
                <option value="Lifan">Lifan</option>
                <option value="Chevrolet">Chevrolet</option>
              </select>
              <p className="p-1 text-red-600 text-sm">
                {errors.Brand?.message}
              </p>
            </div>
          )}
          {propertyType === "Vehicle" && (
            <div>
              <div className="mb-4">
                <Label htmlFor="type" className="font-bold">
                  Model :
                </Label>
              </div>
              <select
                {...register("Model")}
                className="block appearance-none marker w-[180px] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="" disabled>
                  Select option
                </option>
                <option value="Corolla">Corolla</option>
                <option value="Yaris">Yaris</option>
                <option value="Hilux">Hilux</option>
                <option value="Platz">Platz</option>
                <option value="Rava4">Rava4</option>
                <option value="Vitz">Vitz</option>
                <option value="Highlander">Highlander</option>
              </select>
              <p className="p-1 text-red-600 text-sm">
                {errors.Model?.message}
              </p>
            </div>
          )}
          {propertyType === "Vehicle" && (
            <div>
              <div className="mb-4">
                <Label htmlFor="type" className="font-bold">
                  Transmission :
                </Label>
              </div>

              <select
                {...register("Transmission")}
                className="block appearance-none marker w-[180px] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="" disabled>
                  Select option
                </option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
              <p className="p-1 text-red-600 text-sm">
                {errors.Transmission?.message}
              </p>
            </div>
          )}
          {propertyType === "Vehicle" && (
            <div>
              <div className="mb-4">
                <Label htmlFor="type" className="font-bold">
                  Body Type :
                </Label>
              </div>
              <select
                {...register("BodyType")}
                className="block appearance-none marker w-[180px] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="" disabled>
                  Select option
                </option>
                <option value="Sedan">Sedan</option>
                <option value="Truck">Truck</option>
                <option value="Compact">Compact</option>
                <option value="Minibus">Minibus</option>
                <option value="SUV">SUV</option>
                <option value="Pickup">Pickup</option>
              </select>
              <p className="p-1 text-red-600 text-sm">
                {errors.BodyType?.message}
              </p>
            </div>
          )}
          {propertyType === "Vehicle" && (
            <div>
              <div className="mb-4">
                <Label htmlFor="type" className="font-bold">
                  Fuel Type :
                </Label>
              </div>
              <select
                {...register("FuelType")}
                className="block appearance-none marker w-[180px] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="" disabled>
                  Select option
                </option>
                <option value="Benzine">Benzine</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
              <p className="p-1 text-red-600 text-sm">
                {errors.FuelType?.message}
              </p>
            </div>
          )}
          {propertyType === "Vehicle" && (
            <div className="mb-2">
              <Label htmlFor="title" className="font-bold">
                Mileage :
              </Label>
              <Input
                type="number"
                id="mileage"
                placeholder="Mileage in KM"
                className="mt-3 w-44"
                {...register("Mileage")}
              />
              <p className="p-1 text-red-600 text-sm">
                {errors.Mileage?.message}
              </p>
            </div>
          )}
          {propertyType === "Vehicle" && (
            <div className="mb-2">
              <Label htmlFor="year" className="font-bold">
                Year :
              </Label>
              <Input
                type="number"
                id="year"
                placeholder="Year"
                className="mt-3 w-44"
                {...register("Year")}
              />
              <p className="p-1 text-red-600 text-sm">{errors.Year?.message}</p>
            </div>
          )}
          {propertyType === "Vehicle" && (
            <div>
              <Label htmlFor="Color" className="font-bold">
                Color
              </Label>
              <select
                className="block w-44 py-2 px-3 border focus:border-black rounded-md shadow-sm"
                style={{
                  backgroundColor: "transparent", // Remove green background on hover
                }}
                {...register("Color")}
              >
                <option value="">Select an Option</option>
                {colors.map((color) => (
                  <option
                    key={color.name}
                    value={color.value}
                    className="flex items-center hover:bg-transparent"
                    style={{
                      padding: "5px",
                      borderRadius: "50px",
                      backgroundColor: color.value,
                      color:
                        color.value === "#000" || color.value === "#FFFFFF"
                          ? color.value === "#000"
                            ? "#FFF" // White text on black background
                            : "#000000" // Black text on white background
                          : "#000000", // Conditional color based on background color
                    }}
                  >
                    {/* Display the color circle */}
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: color.value }}
                    ></div>
                    <span> {color.name}</span>
                  </option>
                ))}
              </select>
              <p className="p-1 text-red-600 text-sm">
                {errors.Color?.message}
              </p>
            </div>
          )}

          <div>
            <div className="mb-4">
              <Label htmlFor="ContractType" className="font-bold">
                Contract Type :
              </Label>
            </div>
            <select
              {...register("ContractType")}
              onChange={(e) => handleContractTypeChange(e.target.value)}
              className="block appearance-none marker w-[180px] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="" disabled>
                Select option
              </option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
            <p className="p-1 text-red-600 text-sm">
              {errors.ContractType?.message}
            </p>
          </div>
          <div>
            <div className="mb-4">
              <Label htmlFor="Currency" className="font-bold">
                Currency :
              </Label>
            </div>
            <select
              {...register("Currency")}
              className="block appearance-none marker w-[180px] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="" disabled>
                Select option
              </option>
              <option value="USD">USD</option>
              <option value="ETB">ETB</option>
            </select>
            <p className="p-1 text-red-600 text-sm">
              {errors.Currency?.message}
            </p>
          </div>
          <div>
            <div className="mb-4">
              <Label htmlFor="City" className="font-bold">
                City :
              </Label>
            </div>
            <select
              {...register("City")}
              className="block appearance-none marker w-[180px] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="" disabled>
                Select option
              </option>
              <option value="Addis Abeba">Addis Abeba</option>
              <option value="Adama">Adama</option>
              <option value="Jimma">Jimma</option>
              <option value="Ambo">Ambo</option>
            </select>
            <p className="p-1 text-red-600 text-sm">{errors.City?.message}</p>
          </div>
          <div>
            <div className="mb-4">
              <Label htmlFor="type" className="font-bold">
                Price Category :
              </Label>
            </div>

            <select
              {...register("PriceCategory")}
              className="block appearance-none marker w-[180px] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="" disabled>
                Select option
              </option>
              <option value="Negotiable">Negotiable</option>
              <option value="Adama">Slightliy Negotiable</option>
              <option value="Jimma">Fixed</option>
            </select>
            <p className="p-1 text-red-600 text-sm">
              {errors.PriceCategory?.message}
            </p>
          </div>
          <div className="mb-2">
            <Label htmlFor="title" className="font-bold">
              Proprety Price :
            </Label>
            <Input
              type="number"
              id="title"
              placeholder="Price"
              className="mt-3 w-44"
              {...register("Price")}
            />
            <p className="p-1 text-red-600 text-sm">{errors.Price?.message}</p>
          </div>

          <div className="mb-2">
            <Label htmlFor="title" className="font-bold mb-3">
              Price Prefix:
            </Label>
            <select
              {...register("PricePrefix")}
              className="block appearance-none marker w-[180px] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-3"
            >
              <option value="" disabled>
                Select option
              </option>
              <option value="Per Month">Per Month</option>
              <option value="Per Year">Per Year</option>
            </select>
            <p className="p-1 text-red-600 text-sm">
              {errors.PricePrefix?.message}
            </p>
          </div>
          {propertyType === "House" && (
            <div className="mb-2">
              <Label htmlFor="title" className="font-bold">
                Bedrooms :
              </Label>
              <Input
                type="number"
                id="title"
                placeholder="Bedrooms"
                className="mt-3 w-44"
                {...register("Bedrooms")}
              />
              <p className="p-1 text-red-600 text-sm">
                {errors.Bedrooms?.message}
              </p>
            </div>
          )}
          {propertyType === "House" && (
            <div className="mb-2">
              <Label htmlFor="title" className="font-bold">
                Bathrooms :
              </Label>
              <Input
                type="number"
                id="title"
                placeholder="Bathrooms"
                className="mt-3 w-44"
                {...register("Bathrooms")}
              />
              <p className="p-1 text-red-600 text-sm">
                {errors.Bathrooms?.message}
              </p>
            </div>
          )}
          {(propertyType === "House" || propertyType === "Land") && (
            <div className="mb-2">
              <Label htmlFor="Area" className="font-bold">
                Area :
              </Label>
              <Input
                type="number"
                id="Area"
                placeholder="Area in sq/metre"
                className="mt-3 w-44"
                {...register("Area")}
              />
              <p className="p-1 text-red-600 text-sm">{errors.Area?.message}</p>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="title" className="font-bold">
            Images :
          </label>
          <div className="w-full rounded-lg border border-gray-300 p-4">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="image-upload"
              className="custom-file-upload block  mx-auto text-center  text-black rounded-lg p-2 cursor-pointer mt-4"
            >
              Click to Select files
            </label>
            <label
              htmlFor="image-upload"
              className="custom-file-upload block w-36 mx-auto text-center bg-green text-white rounded-lg p-2 cursor-pointer mt-1"
            >
              Browse files
            </label>
            <div className="flex flex-wrap">
              {images.map((image, index) => (
                <div key={index} style={{ position: "relative" }}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Image ${index}`}
                    style={{ maxWidth: "200px", margin: "10px" }}
                  />
                  <button
                    aria-label="delete"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 text-red-500 bg-transparent border-none cursor-pointer mb-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.293 4.293a1 1 0 0 1 1.414 1.414L11.414 12l5.293 5.293a1 1 0 1 1-1.414 1.414L10 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L8.586 12 3.293 6.707a1 1 0 0 1 1.414-1.414L10 10.586l5.293-5.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          {imageError && (
            <p className="text-red-500 mt-2">
              Please select at least one Image file
            </p>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="title" className="font-bold">
            Property Ownership Documents :
          </label>
          <div className="w-full rounded-lg border border-gray-300 p-4">
            <input
              id="pdf-upload"
              type="file"
              accept=".pdf" // Accepts only PDF files
              multiple
              onChange={handlePdfChange}
              className="hidden"
            />
            <label
              htmlFor="pdf-upload"
              className="custom-file-upload block mx-auto text-center text-black rounded-lg p-2 cursor-pointer mt-4"
            >
              Click to Select PDF files
            </label>
            <label
              htmlFor="pdf-upload"
              className="custom-file-upload block w-36 mx-auto text-center bg-green text-white rounded-lg p-2 cursor-pointer mt-1"
            >
              Browse PDF files
            </label>
            <div className="flex flex-wrap">
              {pdfs.map((pdf, index) => (
                <div key={index} style={{ position: "relative" }}>
                  <embed
                    src={URL.createObjectURL(pdf)}
                    type="application/pdf"
                    className="max-w-200px m-2"
                  />
                  <button
                    aria-label="delete"
                    onClick={() => handleRemovePdf(index)}
                    className="absolute top-0 right-0 text-red-500 bg-transparent border-none cursor-pointer mb-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.293 4.293a1 1 0 0 1 1.414 1.414L11.414 12l5.293 5.293a1 1 0 1 1-1.414 1.414L10 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L8.586 12 3.293 6.707a1 1 0 0 1 1.414-1.414L10 10.586l5.293-5.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            {pdfError && (
              <p className="text-red-500 mt-2">
                Please select at least one PDF file
              </p>
            )}
          </div>
          <Button className="bg-green  mb-3 mt-4 px-6 hover:bg-green/90">
            Submit
          </Button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
export default Homepage;
