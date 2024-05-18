import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { footer } from "../../data/Data";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer className="pt-3 mt-4">
        <div className="container pl-6 pr-6">
          <div className="box">
            <div className="">
              <h2 className="text-2xl ">Contact Us</h2>
              <div className="flex flex-col text-white ml-6 mt-1">
                <div className="flex mt-2">
                  <LocationOnOutlinedIcon />
                  <p className="text-white font-light ml-3 ">Addis Abeba</p>
                </div>
                <div className="flex  mt-2">
                  <PhoneIcon />
                  <p className="text-white font-light ml-3">+251994104901</p>
                </div>
                <div className="flex mt-2">
                  <MailOutlineIcon />
                  <p className="text-white font-light ml-3">bsms@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {footer.map((val, index) => (
            <div className="box" key={index}>
              <h3 className="capitalize text-1xl">{val.title}</h3>
              <ul>
                {val.text.map((items, index) => (
                  <li key={index}> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className="legal">
        <span>© 2024 BSMS. Developed By MNZG.</span>
      </div>
    </>
  );
};

export default Footer;
