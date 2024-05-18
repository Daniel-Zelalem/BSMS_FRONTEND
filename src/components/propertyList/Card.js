import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBed,
  faRestroom,
} from "@fortawesome/free-solid-svg-icons";
import { TbManualGearbox } from "react-icons/tb";
import { MdPrecisionManufacturing } from "react-icons/md";
import { BsFuelPumpDieselFill } from "react-icons/bs";
import Link from "next/link";
import React from "react";
import "./property.css";
import { useRouter } from "next/navigation";

const Home = ({ property }) => {
  const propertyValues = { ...property };
  const createdAt = new Date(propertyValues.createdAt);
  const currentDate = new Date();
  const differenceInMs = currentDate - createdAt;
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysSincePublication = Math.floor(differenceInMs / millisecondsPerDay);
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = React.useState(storedUserData);

  const router = useRouter();

  const handleViewProperty = () => {
    if (userData) {
      router.push(
        `/listings/${propertyValues.PropertyType}/${propertyValues._id}`
      );
    } else {
      router.push("/login");
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  p-4 mt-7 w-806  gap-1">
      <div
        key={property._id}
        className=" mx-auto rounded-md shadow-md overflow-hidden relative card bg-slate-400"
      >
        <div className="relative  w-70 group">
          <Image
            src={property.imageUrls[0]}
            alt={property.Description}
            width={400}
            height={100}
            loading="lazy"
            className="aspect-4/3"
          />
          <div className="status-overlay ">
            <div className="mt-4 text-darkBlue">
              {propertyValues.ContractType}
            </div>
          </div>
          <div className="price-overlay mt-3">
            <div className="mx-2">
              <h2 className="green-color rounded text-green px-2 font-bold">
                {`${propertyValues.Price.toLocaleString()} ${
                  propertyValues.Currency
                }`}
              </h2>
            </div>
          </div>
          <button
            className="hidden bg-green btn-hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:block hover:bg-white hover:text-black p-2 rounded text-white text-sm"
            onClick={handleViewProperty}
          >
            View Property
          </button>
        </div>

        <div className="mt-3 text-left ">
          {propertyValues.PropertyType === "House" && (
            <h3 className="text-darkBlue ml-4 mb-1 mt-1">
              {propertyValues.PropertyType}
            </h3>
          )}
          {propertyValues.PropertyType === "Vehicle" && (
            <h3 className="text-darkBlue ml-4 mb-1 mt-1">
              {propertyValues.PropertyType}
            </h3>
          )}
          {propertyValues.PropertyType === "Land" && (
            <h3 className="text-darkBlue ml-4 mb-1 mt-1">
              {propertyValues.PropertyType}
            </h3>
          )}
          <div className="text-sm  text-darkBlue ml-4 flex flex-row justify-between mt-8">
            <div>
              <FontAwesomeIcon icon={faLocationDot} />
              <a className="px-0 ml-1 text-green">{propertyValues.City}</a>
            </div>
          </div>
        </div>
        <div className=" bg-slate-200 pt-2">
          <div className="flex flex-row justify-between">
            {propertyValues.PropertyType === "House" && (
              <div className="flex flex-col text-darkBlue ml-4">
                <p className="text-gray-600">Bedrooms</p>
                <div className="flex flex-row justify-start ">
                  <FontAwesomeIcon icon={faBed} className="mt-1 " />
                  <span className="ml-2 mb-3">{propertyValues.Bedroom}</span>
                </div>
              </div>
            )}
            {propertyValues.PropertyType === "House" && (
              <div className="flex flex-col text-darkBlue ml-4">
                <p className="text-gray-600">Bathrooms</p>
                <div className="flex flex-row justify-start ">
                  <TbManualGearbox icon={faBed} className="mt-1 " />
                  <span className="ml-2 mb-3">{propertyValues.Bathroom}</span>
                </div>
              </div>
            )}
            {propertyValues.PropertyType === "Vehicle" && (
              <div className="flex flex-col text-darkBlue ml-4">
                <p className="text-gray-600">Transmission</p>
                <div className="flex flex-row justify-start ">
                  <TbManualGearbox className="mt-1 " />
                  <span className="ml-2 mb-3">
                    {propertyValues.Transmission}
                  </span>
                </div>
              </div>
            )}
            {propertyValues.PropertyType === "Vehicle" && (
              <div className="flex flex-col text-darkBlue ml-4">
                <p className="text-gray-600 mr-4">Year</p>
                <div className="flex flex-row justify-start ml-2">
                  <MdPrecisionManufacturing className="mt-1 " />
                  <span className="ml-1 mb-3">
                    {propertyValues.ManufacturingYear}
                  </span>
                </div>
              </div>
            )}
            {propertyValues.PropertyType === "Vehicle" && (
              <div className="flex flex-col text-darkBlue ml-4">
                <p className="text-gray-600 mr-1">Fuel Type</p>
                <div className="flex flex-row justify-start ">
                  <BsFuelPumpDieselFill className="mt-1 " />
                  <span className="ml-2 mr-1 mb-6">
                    {propertyValues.FuelType}
                  </span>
                </div>
              </div>
            )}
            {(propertyValues.PropertyType === "House" && (
              <div className="flex flex-col text-darkBlue ml-4">
                <p className="text-gray-600">Area</p>
                <div className="flex flex-row justify-start mt-1">
                  <svg
                    version="1.1"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="20px"
                    height="17px"
                    viewBox="0 0 24 24"
                    xmlSpace="preserve"
                  >
                    <g>
                      <circle cx="2" cy="2" r="2"></circle>
                    </g>
                    <g>
                      <circle cx="2" cy="22" r="2"></circle>
                    </g>
                    <g>
                      <circle cx="22" cy="2" r="2"></circle>
                    </g>
                    <rect x="1" y="1" width="2" height="22"></rect>
                    <rect x="1" y="1" width="22" height="2"></rect>
                    <path
                      opacity="0.5"
                      d="M23,20.277V1h-2v19.277C20.7,20.452,20.452,20.7,20.277,21H1v2h19.277c0.347,0.596,0.984,1,1.723,1 c1.104,0,2-0.896,2-2C24,21.262,23.596,20.624,23,20.277z"
                    ></path>
                  </svg>
                  <span className="ml-2 mb-2 pr-2 pb-1">
                    {propertyValues.Area} sq/Metre
                  </span>
                </div>
              </div>
            )) ||
              (propertyValues.PropertyType === "Land" && (
                <div className="flex flex-col text-darkBlue ml-4">
                  <p className="text-gray-600">Area</p>
                  <div className="flex flex-row justify-start mt-1">
                    <svg
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      width="20px"
                      height="17px"
                      viewBox="0 0 24 24"
                      xmlSpace="preserve"
                    >
                      <g>
                        <circle cx="2" cy="2" r="2"></circle>
                      </g>
                      <g>
                        <circle cx="2" cy="22" r="2"></circle>
                      </g>
                      <g>
                        <circle cx="22" cy="2" r="2"></circle>
                      </g>
                      <rect x="1" y="1" width="2" height="22"></rect>
                      <rect x="1" y="1" width="22" height="2"></rect>
                      <path
                        opacity="0.5"
                        d="M23,20.277V1h-2v19.277C20.7,20.452,20.452,20.7,20.277,21H1v2h19.277c0.347,0.596,0.984,1,1.723,1 c1.104,0,2-0.896,2-2C24,21.262,23.596,20.624,23,20.277z"
                      ></path>
                    </svg>
                    <span className="ml-2 mb-4 pr-2 pb-1">
                      {propertyValues.Area} sq/Metre
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className=" flex flex-row justify-between">
          <p className="ml-4 mt-10  text-sm">
            {` Published ${daysSincePublication} days ago`}
          </p>
          <div className="flex flex-row justify-start items-center text-darkBlue ">
            {propertyValues.Broker?.imageUrls &&
              propertyValues.Broker.imageUrls[0] && ( // Check if broker.imageUrls exists and has at least one element
                <div className="relative rounded-full overflow-hidden h-12 w-12">
                  <Image
                    src={propertyValues.Broker.imageUrls[0]}
                    alt={propertyValues.Description}
                    height={70}
                    width={70}
                    className="rounded-full"
                  />
                </div>
              )}
            <div className="flex flex-col justify-start text-darkBlue  mt-4 mb-3 ml-3 pr-2">
              <p className="font-medium">Agent</p>
              <p>{propertyValues.Broker?.FirstName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
