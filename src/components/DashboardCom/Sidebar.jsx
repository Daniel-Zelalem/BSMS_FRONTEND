"use client";
import classNames from "classnames";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { RxDashboard } from "react-icons/rx";
import { FaHouseChimney } from "react-icons/fa6";

import { CollapsIcon } from "../icons";
import { CiChat2 } from "react-icons/ci";

import {
  MdOutlineSupportAgent,
  MdOutlineRealEstateAgent,
} from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";

import { IoIosAddCircleOutline } from "react-icons/io";
import { MdAppRegistration } from "react-icons/md";
import { IoIosList } from "react-icons/io";

import { BiListPlus, BiUserPlus } from "react-icons/bi";
import { VscDiffAdded } from "react-icons/vsc";
import { TbBuildingWarehouse } from "react-icons/tb";

import { IoDocumentsOutline } from "react-icons/io5";
import { PiSignature } from "react-icons/pi";
import { BsDownload } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiUserStarLine } from "react-icons/ri";
import { PiUploadSimple } from "react-icons/pi";
import { FaCloudDownloadAlt } from "react-icons/fa";
const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const menuRef = useRef(null);
  const [toggleChildCollapse, setToggleChildCollapse] = useState(false);
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData || {});
  }, []);

  if (!userData) {
    return null;
  }
  const userRole = userData.user ? userData.user.Role : "";

  //Users Item
  const menuItems_user = [
    {
      id: 1,
      label: "Dashboard",
      icon: <RxDashboard size={25} className="text-green" />,
      link: "/dashboard/seller",
    },
    {
      id: 3,
      label: "Post Properties",
      icon: <VscDiffAdded size={25} className="text-green" />,
      link: "/dashboard/seller/post",
    },
    {
      id: 2,
      label: "My Properties",
      icon: <TbBuildingWarehouse size={25} className="text-green" />,
      link: "/dashboard/seller/properties",
    },
    {
      id: 3,
      title: "Agreement Documents",
      icon: <IoDocumentsOutline size={25} className="text-green" />,
      children: [
        {
          id: 7,
          title: "Sign",
          icon: <PiSignature size={19} className="text-green" />,
          link: "/dashboard/seller/agreement/upload",
        },
        {
          id: 8,
          title: "Download",
          icon: <BsDownload size={19} className="text-green" />,
          link: "/dashboard/seller/agreement/download",
        },
      ],
    },
    {
      id: 5,
      label: "Payment",
      icon: <MdOutlinePayment size={25} className="text-green" />,
      link: "/dashboard/seller/payment",
    },
    {
      id: 6,
      label: "Job-Seekers",
      icon: <BiUserPlus size={25} className="text-green" />,
      link: "/dashboard/seller/job-seeker",
    },
    {
      id: 7,
      label: "Conversation",
      icon: <CiChat2 size={25} className="text-green" />,
      link: "/dashboard/seller/conversation/RootChat/chats",
    },
  ];

  //Admin Item
  const menuItems_admin = [
    {
      id: 1,
      label: "Dashboard",
      icon: <RxDashboard size={25} className="text-green" />,
      link: "/dashboard/companies",
    },
    {
      id: 2,
      title: "Managers",
      icon: <FaHouseChimney size={25} className="text-green" />,
      link: "/dashboard/manage",

      children: [
        {
          id: 8,
          title: "Manage Managers",
          icon: <MdOutlineManageAccounts size={20} className="text-green" />,
          link: "/dashboard/manage",
        },
      ],
    },
  ];

  //BrokerManager Item
  const menuItems_brokerManager = [
    {
      id: 1,
      label: "Dashboard",
      icon: <RxDashboard size={23} className="text-green" />,
      link: "/dashboard/brokermanager",
    },
    {
      id: 2,
      title: "Users",
      icon: <FaUsers size={25} className="text-green" />,
      children: [
        {
          id: 5,
          title: "Clients",
          icon: <RiUserStarLine size={15} className="text-green" />,
          link: "/dashboard/brokermanager/customers",
        },
        {
          id: 6,
          title: "Brokers",
          icon: <MdOutlineSupportAgent size={15} className="text-green" />,
          link: "/dashboard/brokermanager/agents",
        },
      ],
    },
    {
      id: 3,
      title: "Property",
      icon: <MdOutlineRealEstateAgent size={25} className="text-green" />,
      children: [
        {
          id: 7,
          title: " Property Add",
          icon: <IoIosAddCircleOutline size={15} className="text-green" />,
          link: "/dashboard/brokermanager/add",
        },
        {
          id: 8,
          title: "Assign Broker",
          icon: <MdAppRegistration size={15} className="text-green" />,
          link: "/dashboard/brokermanager/assignbroker",
        },
        {
          id: 9,
          title: " Property List",
          icon: <IoIosList size={15} className="text-green" />,
          link: "/dashboard/brokermanager/list",
        },
      ],
    },
  ];

  //Brokers Item
  const menuItems_broker = [
    {
      id: 1,
      label: "Dashboard",
      icon: <RxDashboard size={25} className="text-green" />,
      link: "/dashboard/broker",
    },
    {
      id: 2,
      label: "Employees",
      icon: <BiUserPlus size={25} className="text-green" />,
      link: "/dashboard/broker/employee",
    },
    {
      id: 3,
      title: "Property",
      icon: <BiListPlus size={25} className="text-green" />,
      children: [
        {
          id: 7,
          title: "Property Add",
          icon: <IoIosAddCircleOutline size={15} className="text-green" />,
          link: "/dashboard/broker/add",
        },
        {
          id: 8,
          title: "Assigned Property",
          icon: <MdAppRegistration size={15} className="text-green" />,
          link: "/dashboard/broker/property/assigned",
        },
        {
          id: 9,
          title: "Property List",
          icon: <IoIosList size={15} className="text-green" />,
          link: "/dashboard/broker/property/list",
        },
      ],
    },
    {
      id: 4,
      title: "Agreement Documents",
      icon: <IoDocumentsOutline size={25} className="text-green" />,
      children: [
        {
          id: 7,
          title: "Upload",
          icon: <PiUploadSimple size={15} className="text-green" />,
          link: "/dashboard/broker/agreement/upload",
        },
        {
          id: 8,
          title: "Download",
          icon: <FaCloudDownloadAlt size={15} className="text-green" />,
          link: "/dashboard/broker/agreement/download",
        },
      ],
    },
    {
      id: 5,
      label: "Conversation",
      icon: <CiChat2 size={25} className="text-green" />,
      link: "/dashboard/broker/conversation/RootChat/chats",
    },
  ];

  let activeSidebarItems = (() => {
    if (userRole === "Admin") {
      return menuItems_admin;
    } else if (userRole === "User") {
      return menuItems_user;
    } else if (userRole === "BrokerAdmin") {
      return menuItems_brokerManager;
    } else if (userRole === "Broker") {
      return menuItems_broker;
    }

    return [];
  })();

  const handleItemClick = (item) => {
    setActiveItem(item.id);
  };

  const wrapperClasses = classNames(
    "bg-gray-100 h-full fixed px-2 bg-light flex justify-between flex-col border border-gray-300"
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div className={wrapperClasses} ref={menuRef}>
      <div className="flex flex-col pt-4">
        <div className="flex items-center justify-between relative px-3">
          <div className="flex items-center pl-2 gap-4 mb-2">
            <span className=" text-lg font-medium text-text">
              <Link href="/">
                <div className=" p-2 rounded-lg inline-block">
                  <span className="text-1xl text-green font-bold">BSMS</span>
                </div>
              </Link>
            </span>
          </div>
          <button
            className={collapseIconClasses}
            onClick={handleSidebarToggle}
            style={{ marginBottom: "7px" }}
          >
            <CollapsIcon />
          </button>
        </div>
        <div className="flex flex-col items-start  gap-1">
          {activeSidebarItems.map(
            ({ id, title, icon, children, label, link }) => (
              <div key={id} className="relative">
                {!toggleCollapse && title && (
                  <div
                    style={{ marginTop: "5px", marginLeft: "4px" }}
                    className="flex items-center text-sm text-darkBlue font-semibold"
                    onClick={() => handleItemClick({ id })}
                  >
                    {icon}
                    <span className="text-ml text-darkBlue ml-4 ">{title}</span>
                  </div>
                )}
                {children && !toggleCollapse ? (
                  <div className="flex flex-col ">
                    {children.map(({ id, childId, title, icon, link }) => (
                      <Link href={link || "#"} key={childId}>
                        <div
                          key={id}
                          className="flex items-center text-sm text-darkBlue ml-10 py-1 cursor-pointer font-medium"
                          onClick={() => handleItemClick({ id })}
                        >
                          {icon}
                          <span className="ml-2">{title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link href={link || "#"} key={id}>
                    <div
                      className="flex px-1 items-center cursor-pointer hover:bg-gray-200 hover:rounded-lg text-darkBlue font-semibold"
                      onClick={() => handleItemClick({ id })}
                    >
                      {icon}
                      {!toggleCollapse && !title && (
                        <div
                          className="cursor-pointer p-4 rounded-lg flex items-center"
                          style={{ width: "12rem" }}
                        >
                          <span
                            className="text-sm text-darkBlue"
                            onClick={() => handleItemClick({ id })}
                          >
                            {label}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
