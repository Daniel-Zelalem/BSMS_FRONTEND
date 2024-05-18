"use client";
import * as React from "react";
import * as yup from "yup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Map from "@/components/Maps/ShowProperty";
import { FaSearchMinus } from "react-icons/fa";
import Card from "@/components/propertyList/Card";
import Pagination from "@mui/material/Pagination";

export default function SelectSmall() {
  const [range, setRange] = React.useState([1000000, 10000000]);

  const btnStyle = {
    color: "black",
    border: "2px solid rgb(0, 167, 111)",
    marginRight: "6px",
    textTransform: "capitalize",
    fontWeight: "bold",
  };

  const [propType, setPropType] = React.useState("All");
  const [contractType, setcontractType] = React.useState("All");
  const [city, setcity] = React.useState("All");
  const [price, setPrice] = React.useState(null);
  const [currency, setCurrency] = React.useState("Both");
  const [bedrooms, setBedrooms] = React.useState("Any");
  const [bathrooms, setBathrooms] = React.useState("Any");
  const [category, setCategory] = React.useState("All");
  const [properties, setProperties] = React.useState([]);
  const [originalProperties, setOriginalProperties] = React.useState([]);
  const [searchPerformed, setSearchPerformed] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  var [propertiesPerPage, setPropertiesPerPage] = React.useState(3);

  const handleContractTypeChange = (event) => {
    setcontractType(event.target.value);
  };
  const handleCityChange = (e) => {
    setcity(e.target.value);
  };
  const handleBedroomChange = (e) => {
    setBedrooms(e.target.value);
  };
  const handleBathroomChange = (e) => {
    setBathrooms(e.target.value);
  };
  const handlePropTypeChange = (e) => {
    setPropType(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };
  const handleClear = (e) => {
    setPropType("All");
    setcity("All");
    setcontractType("All");
  };

  React.useEffect(() => {
    const fetchAllProperty = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Allproperty/all`,
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

        const data = await response.json();
        if (data.data) {
          setProperties(data.data);
          setOriginalProperties(data.data);
        } else {
          console.log("No Properties Found!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchAllProperty();
  }, []);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const onSubmit = (data) => {
    propertiesPerPage = 3;
    const filteredProperties = originalProperties.filter((property) => {
      let score = 0;
      if (propType === "All" && contractType == "All" && city === "All") {
        score += 3;
      }
      if (
        propType === "All" &&
        contractType == "All" &&
        property.City === city
      ) {
        score += 3;
      }
      if (
        propType === "All" &&
        property.ContractType === contractType &&
        city === "All"
      ) {
        score += 3;
      }
      if (
        property.PropertyType === propType &&
        contractType == "All" &&
        property.City === city
      ) {
        score += 3;
      }
      if (
        propType === "All" &&
        property.ContractType === contractType &&
        property.City === city
      ) {
        score += 3;
      }
      if (
        property.PropertyType === propType &&
        property.ContractType === contractType &&
        city === "All"
      ) {
        score += 3;
      }
      if (
        property.PropertyType === propType &&
        contractType == "All" &&
        city === "All"
      ) {
        score += 3;
      }
      if (propType !== "All" && property.PropertyType === propType) {
        score += 1;
      }
      if (contractType !== "All" && property.ContractType === contractType) {
        score += 1;
      }
      if (city !== "All" && property.City === city) {
        score += 1;
      }
      if (
        price !== null &&
        Math.abs(property.Price - parseFloat(price)) < 1000
      ) {
        score += 1;
      }
      return score >= 3;
    });
    setProperties(filteredProperties);
    setSearchPerformed(true);
    setPropertiesPerPage(searchPerformed ? 3 : 3);
  };

  return (
    <div className="flex justify-center">
      <div>
        <div className="mt-20">
          <Map height={400} width={1100} properties={properties} />
        </div>
        <div className="bg-white flex flex-col md:flex-row justify-center items-center mx-28 ">
          <div className="flex flex-wrap justify-center md:justify-start">
            <FormControl sx={{ m: 1, minWidth: 175 }} size="small">
              <InputLabel>Property Type</InputLabel>
              <Select
                value={propType}
                label="Property Category"
                onChange={handlePropTypeChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="House">House</MenuItem>
                <MenuItem value="Vehicle">Vehicle</MenuItem>
                <MenuItem value="Land">Land</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 175 }} size="small">
              <InputLabel>Contract Type</InputLabel>
              <Select
                value={contractType}
                label="Contract Type"
                onChange={handleContractTypeChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="For Rent">For Rent</MenuItem>
                <MenuItem value="For Sale">For Sale</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 175 }} size="small">
              <InputLabel>City</InputLabel>
              <Select value={city} label="City" onChange={handleCityChange}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Addis Abeba">Addis Abeba</MenuItem>
                <MenuItem value="Adama">Adama</MenuItem>
                <MenuItem value="Jimma">Jimma</MenuItem>
                <MenuItem value="Ambo">Ambo</MenuItem>
              </Select>
            </FormControl>

            <div className="flex justify-center items-center  md:mt-0 ">
              <button
                className="flex items-center justify-center w-16 bg-green rounded h-10 hover:bg-green/70"
                onClick={onSubmit}
              >
                <FaSearchMinus className="text-white font-bold text-1xl" />
              </button>

              <button
                className="flex items-center justify-center rounded h-10 pr-2 ml-2 hover:bg-green/85"
                style={btnStyle}
                onClick={handleClear}
              >
                <span className="ml-2 text-black font-bold text-center hover:text-white ">
                  Clear
                </span>
              </button>
            </div>
          </div>
        </div>
        <section className="px-24 mt-2 ">
          <div className="flex flex-row justify-between items-center">
            {searchPerformed && (
              <h1 className="font-semibold text-1xl ml-8">Search Result</h1>
            )}
          </div>
          <div className="flex flex-row justify-between items-center mt-5">
            {searchPerformed && (
              <h1 className="font-normal  text-1xl ml-8">
                {properties.length}
                <span> Results Found</span>
              </h1>
            )}
          </div>
        </section>
        <section className="px-24  mb-20 flex flex-row">
          {/* {searchPerformed && (
            <div className="mr-8 mt-9">
           
              <div>
                <h2 className="text-lg ml-8 font-semibold mb-1">Filters</h2>
                <div className="ml-6  mt-2">
                  <FormControl sx={{ m: 1, minWidth: 175 }} size="small">
                    <InputLabel>House Category</InputLabel>
                    <Select
                      value={category}
                      label="Property Category"
                      onChange={handleCategoryChange}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Villa">Villa</MenuItem>
                      <MenuItem value="Condominium">Condominium</MenuItem>
                      <MenuItem value="Apartment">Apartment</MenuItem>
                      <MenuItem value="Office">Office</MenuItem>
                      <MenuItem value="Studio">Studio</MenuItem>
                      <MenuItem value="Single Familiy">Single Familiy</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="ml-6  mt-2">
                  <FormControl sx={{ m: 1, minWidth: 175 }} size="small">
                    <InputLabel>Bedrooms</InputLabel>
                    <Select
                      value={bedrooms}
                      label="Bedrooms"
                      onChange={handleBedroomChange}
                    >
                      <MenuItem value="Any">Any</MenuItem>
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                      <MenuItem value="5">5</MenuItem>
                      <MenuItem value="6">6</MenuItem>
                      <MenuItem value="7">7</MenuItem>
                      <MenuItem value="8">8</MenuItem>
                      <MenuItem value="9">9</MenuItem>
                      <MenuItem value="10">10</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="ml-6  mt-2">
                  <FormControl sx={{ m: 1, minWidth: 175 }} size="small">
                    <InputLabel>Bathrooms</InputLabel>
                    <Select
                      value={bathrooms}
                      label="Bathrooms"
                      onChange={handleBathroomChange}
                    >
                      <MenuItem value="Any">Any</MenuItem>
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                      <MenuItem value="5">5</MenuItem>
                      <MenuItem value="6">6</MenuItem>
                      <MenuItem value="7">7</MenuItem>
                      <MenuItem value="8">8</MenuItem>
                      <MenuItem value="9">9</MenuItem>
                      <MenuItem value="10">10</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="ml-6  mt-2">
                  <FormControl sx={{ m: 1, minWidth: 175 }} size="small">
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={currency}
                      label="Currency"
                      onChange={handleCurrencyChange}
                    >
                      <MenuItem value="Both">Both</MenuItem>
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="ETB">ETB</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="ml-8 mt-2">
                  <div style={{ width: "22rem" }}>
                    <h3 className="font-semibold">
                      Price Range: From {range[0]} - {range[1]}
                    </h3>
                    <Slider
                      value={range}
                      onChange={handleChanges}
                      valueLabelDisplay="auto"
                      min={2000}
                      max={999999999}
                    />
                  </div>
                </div>

                {/* Add more filter components as needed */}
          {/* </div>
            </div> */}

          {searchPerformed && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
                {currentProperties.map((property) => (
                  <Card key={property.id} property={property} />
                ))}
              </div>
              <div className="flex justify-end">
                <Pagination
                  count={Math.ceil(properties.length / propertiesPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          )}
          {!searchPerformed && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ml-3">
                {currentProperties.map((property) => (
                  <Card key={property.id} property={property} />
                ))}
              </div>
              <div className="flex justify-end">
                <Pagination
                  count={Math.ceil(properties.length / propertiesPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
