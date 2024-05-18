import React from "react";

const Cards = ({ amount, title, icon: Icon }) => {
  return (
    <div className="w-10/12 mx-1 ">
      <div className=" bg-white flex  w-full  p-4 rounded-xl h-32 shadow-md">
        <div className="flex flex-col w-full pb-4 ">
          <p className="text-veryDarkBlue font-semibold">{title}</p>
          <p className="text-2xl font-bold mt-6 text-darkBlue">{amount}</p>
        </div>
        <div className="bg-green-200 flex justify-center items-center p-2 rounded-lg mt-">
          <span className="text-green-700 text-lg mt-6">
            <Icon className="w-6 h-6 text-green" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
