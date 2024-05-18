import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faLocationDot,
  faBed,
  faRestroom,
} from "@fortawesome/free-solid-svg-icons";
import PropertyCard from "./proprtyCard";
import Button from "@mui/material/Button";

const Property = () => {
  const signUpBtnStyle = {
    color: "hsl(228, 39%, 23%)",
    border: "2px solid hsl(12, 88%, 59%)",
    backgroundColor: "hsl(12, 88%, 69%)",
  };

  return (
    <section>
      <div className="section-title sell-section-title">
        <h2>
          <strong className="text-darkBlue">For Sale</strong>
        </h2>
      </div>
      <div className="container justify-content-between">
        <div className="row justify-between">
          <div className="">
            <PropertyCard />
          </div>
          <div className="">
            <PropertyCard />
          </div>
          <div className="">
            <PropertyCard />
          </div>
          <div className="">
            <PropertyCard />
          </div>
          <div className="">
            <PropertyCard />
          </div>
          <div className="">
            <PropertyCard />
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center ">
        <Button
          variant="outlined"
          style={signUpBtnStyle}
          className="hover:bg-brightRedLight mb-4"
        >
          More
        </Button>
      </div>
    </section>
  );
};

export default Property;
