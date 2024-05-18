"use client";
import React, { useEffect } from "react";
import Image from "next/image";

import "./about.css";
const About = () => {
  return (
    <div className="mt-5">
      <section className="container mt-28">
        <h5 className="text-center font-semibold text-3xl">
          <span className="text-green">Who</span> We Are
        </h5>
        <hr className="w-20 h-1 bg-black mx-auto mt-1"></hr>
      </section>
      <section className="container mt-4">
        <div className="flex flex-row justify-start mx-auto">
          <div className="mr-6 ml-10">
            <Image
              src="/../images/work.jpg"
              width={400}
              height={400}
              alt="About Us Image"
            />
          </div>
          <div className="w-1/2 mt-12 ml-12 mr-12">
            <p>
              Betdelala is reimagining real estate to make it easier to unlock
              life’s next chapter. We live in an always-on world, and we believe
              the challenges of moving to your new place of living shouldn’t get
              in the way of moving forward. That’s why we’re on a mission to
              give people a simpler, more seamless way to buy, sell and rent a
              new home.
            </p>
          </div>
        </div>
      </section>
      <section className="container mt-4">
        <h5 className="text-center font-semibold text-3xl">
          <span className="text-green">What</span> We Do
        </h5>
        <hr className="w-20 h-1 bg-black mx-auto mt-1"></hr>
      </section>
      <section className="container mt-4">
        <div className="flex flex-row justify-start mx-auto">
          <div className="w-1/2 mt-12 ml-6 mr-6">
            <p>
              Betdelala is reimagining real estate to make it easier to unlock
              life’s next chapter. We live in an always-on world, and we believe
              the challenges of moving to your new place of living shouldn’t get
              in the way of moving forward. That’s why we’re on a mission to
              give people a simpler, more seamless way to buy, sell and rent a
              new home.
            </p>
          </div>
          <div className="mr-6 ml-10 mb-10">
            <Image
              src="/../images/work.jpg"
              width={400}
              height={400}
              alt="About Us Image"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
