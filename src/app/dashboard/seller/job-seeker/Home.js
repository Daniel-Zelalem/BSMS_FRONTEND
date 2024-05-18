"use client";
import React from "react";
import JobSeekerTable from "../../../../components/BEmpComp/jobSeekerList";
const Home = () => {
  return (
    <main>
      <div className="py-5 px-0 ml-1">
        <h1
          className="text-xl md:text-xl text-center font-bold py-10 text-gray-600 "
          style={{ fontFamily: "initial" }}
        >
          Job-Seekers List And There Information
        </h1>

        <div>
          <JobSeekerTable />
        </div>
      </div>
    </main>
  );
};
export default Home;
