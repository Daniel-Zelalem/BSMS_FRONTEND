"use client";
import React, { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import EmpUpdate from "./empUpdate";
import EmpAdd from "./empAdd";

const EmpForm = () => {
  const formId = useSelector((state) => state.app.client.formId);
  return (
    <div className="container mx-auto py-5">
        {formId ? <EmpUpdate formId={formId} /> : <EmpAdd />}
    </div>
  );
};
export default EmpForm;
