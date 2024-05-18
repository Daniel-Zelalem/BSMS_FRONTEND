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

const Property = () => {
  return (
    <section>
      <div className="section-title  recommandation-section-title">
        <h2>
          <strong className="text-darkBlue">Recommended Properties</strong>
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
        </div>
      </div>
    </section>
  );
};

export default Property;
