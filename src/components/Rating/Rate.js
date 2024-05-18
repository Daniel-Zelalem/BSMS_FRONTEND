"use client";
import React from "react";
import { AiFillStar } from "react-icons/ai";

const Rate = ({ rate }) => {
  return (
    <div className="flex mt-1 mb-1 pr-5 pb-2">
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              className="hidden"
              type="radio"
              name="rating"
              value={currentRating}
              checked={currentRating === rate}
              readOnly
            />
            <AiFillStar
              className="star"
              size={20}
              color={currentRating <= rate ? "#ffc107" : "#C6DCBA"}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rate;
