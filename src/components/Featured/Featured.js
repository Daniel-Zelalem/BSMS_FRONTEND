import React from "react";
import Heading from "@/components/Heading/Heading";
import "./Featured.css";
import FeaturedCard from "./FeaturedCard";

const Featured = () => {
  return (
    <>
      <section className="featured background lg:mt-10 p-4  ">
        <div className="text-center ">
          <h4 className="text-black font-normal text-3xl mb-10">
            Featured Property Types and Job Seekers
          </h4>
          <FeaturedCard />
        </div>
      </section>
    </>
  );
};

export default Featured;
