import React from "react";
import { Input } from "@/components/ui/input";

const Contact = () => {
  return (
    <>
      <section className="contact mb mt-20">
        <div className="container">
          <h4 className="text-2xl font-semibold mb-4 text-center">
            Fillup The Form
          </h4>
          <form className="shadow">
            <div>
              <div className="w-full">
                <Input type="text" id="password" placeholder="Name" />
              </div>
              <div className="w-full">
                <Input type="email" id="password" placeholder="Email" />
              </div>
            </div>
            <h5 className="mb-2">Subject</h5>
            <textarea cols="30" rows="10"></textarea>
            <button className="bg-green text-veryDarkBlue font-normal rounded p-2">
              Submit Request
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
