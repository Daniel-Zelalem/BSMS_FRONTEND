import React from "react";

const Heading = ({ title, subtitle }) => {
  return (
    <>
      <div className="heading">
        <h2 className="text-white text-4xl mb-6 mt-35 ">{title}</h2>
        <h1 className="text-white">{subtitle}</h1>
      </div>
    </>
  );
};

export default Heading;
