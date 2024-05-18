"use client";
import React from "react";
import { BiUserPlus, BiX } from "react-icons/bi";
import EmpTable from "@/components/BEmpComp/empTable";
import EmpForm from "@/components/BEmpComp/empForm";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, deleteAction } from "@/redux/empRedux/reducer";
import { deleteemployee, showemployee } from "@/lib/emphelper";
import { useQueryClient } from "react-query";
import DeleteComponent from "@/components/BEmpComp/empDelete";

const EmpHome = () => {
  const toggleVisible = useSelector((state) => state.app.client.toggleForm);
  const deleteId = useSelector((state) => state.app.client.deleteId);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const formAndTableVisiblityHandler = () => {
    dispatch(toggleChangeAction());
  };

  const deleteHandler = async () => {
    if (deleteId) {
      await deleteemployee(deleteId);
      await queryClient.prefetchQuery("workers", showemployee);
      dispatch(deleteAction(null));
      location.reload();
    }
  };
  const cancelHandler = async () => {
    dispatch(deleteAction(null));
  };

  return (
    <main>
      <div className="py-5 px-0 ml-1">
        <h1
          className="text-xl md:text-xl text-center font-bold py-0 text-gray-600"
          style={{ fontFamily: "initial" }}
        >
          Job-Seekers Information
        </h1>

        <div className="flex  items-center gap-3 container mx-auto flex justify-end py-2">
          <button
            onClick={formAndTableVisiblityHandler}
            className="flex bg-indigo-400 text-white px-2 py-2 border font-bold rounded-md hover:bg-gray-200 hover:border-indigo-500 hover:text-black"
          >
            {toggleVisible ? "Close" : "Add"}{" "}
            <span className="px-1">
              {toggleVisible ? <BiX size={23} /> : <BiUserPlus size={23} />}
            </span>
          </button>
        </div>
        <div className="flex justify-center mb-5">
          {deleteId ? DeleteComponent({ deleteHandler, cancelHandler }) : <></>}
        </div>

        <div> {toggleVisible ? <EmpForm /> : <EmpTable />}</div>
      </div>
    </main>
  );
};
export default EmpHome;
