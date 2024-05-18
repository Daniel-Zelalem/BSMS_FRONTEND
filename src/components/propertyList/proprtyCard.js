import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faLocationDot,
  faBed,
  faRestroom,
} from "@fortawesome/free-solid-svg-icons";
import Rate from "../Rating/Rate";

function PropertyCard() {
  return (
    <div className="card">
      <span className="badge badge-secondary">
        <FontAwesomeIcon icon={faEye} /> 100
      </span>
      <div className="status-overlay">
        <div className="ml-2 mt-1">For Sale</div>
      </div>
      <div className="price-overlay ">
        <div className="mx-1">
          <h2 className="green-color rounded text-veryRed px-2 ">
            ETB 45,000,000
          </h2>
        </div>
      </div>
      <div className="card-image">
        <img
          className="card-img-top"
          width={348}
          height={200}
          alt="thumbnail"
          loading="lazy"
          fetchPriority="auto"
          ng-img="true"
          src="/../images/hero/h3.png"
        />

        <button className="btn bg-brightRed btn-hidden hover:bg-white hover:text-black">
          View Property
        </button>
      </div>
      <div className="card-body pt-0 px-0">
        <div className="card-title px-3 mb-4 ">
          <h3 style={{ fontSize: "16px" }}>B+G+2</h3>
        </div>
        <div className="card-text px-3">
          <FontAwesomeIcon icon={faLocationDot} />
          <a className=" addr px-0 ml-1 text-brightRedLight">Addis Abeba</a>
        </div>
        <div className="d-flex flex-row justify-content-between p-3 mid">
          <div className="d-flex flex-column">
            <h6 className="text-muted mb-1 text-sm">Bedrooms</h6>
            <div className="d-flex flex-row">
              <FontAwesomeIcon icon={faBed} />
              <div className="d-flex flex-column ml-1">
                <h6 className="ml-1 text-sm">7</h6>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column">
            <h6 className="text-muted mb-1 text-sm">Bathrooms</h6>
            <div className="d-flex flex-row">
              <FontAwesomeIcon icon={faRestroom} />
              <div className="d-flex flex-column ml-1">
                <h6 className="ml-1 text-sm">7</h6>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column">
            <h6 className="text-muted mb-1 text-sm">Area</h6>
            <div className="d-flex flex-row">
              <svg
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                enable-background="new 0 0 24 24"
                xmlSpace="preserve"
                class="rh_svg"
              >
                <g>
                  <circle cx="2" cy="2" r="2"></circle>
                </g>
                <g>
                  <circle cx="2" cy="22" r="2"></circle>
                </g>
                <g>
                  <circle cx="22" cy="2" r="2"></circle>
                </g>
                <rect x="1" y="1" width="2" height="22"></rect>
                <rect x="1" y="1" width="22" height="2"></rect>
                <path
                  opacity="0.5"
                  d="M23,20.277V1h-2v19.277C20.7,20.452,20.452,20.7,20.277,21H1v2h19.277c0.347,0.596,0.984,1,1.723,1 c1.104,0,2-0.896,2-2C24,21.262,23.596,20.624,23,20.277z"
                ></path>
              </svg>

              <div className="d-flex flex-column ml-1">
                <h6 className="ml-1 text-sm">200 Sq/metre</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-2"></div>
      </div>
      <div className="d-flex justify-content-between mt-2">
        <div className="ml">
          <h5 className="text-sm">Published 2 Days ago</h5>
        </div>
        <div className="d-flex items-center mr-3">
          <div className="inline-block">
            <img
              src="/../images/hero/sell.jpeg"
              alt="Agent Image"
              width={50}
              height={50}
              className="rounded border-none align-baseline"
            />
          </div>
          <div className="inline-block ml-4">
            <p className="mr-0 ">Agent</p>
            <span className="text-sm mb-3">Melkamu</span>
          </div>
        </div>
      </div>
      <div className="flex">
        <h6 className="pl-4 py-4">Rate:</h6>
        <Rate />
      </div>
    </div>
  );
}

export default PropertyCard;
