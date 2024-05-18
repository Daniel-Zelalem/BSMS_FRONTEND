"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const TopBar = () => {
  const pathname = usePathname();

  return (
    <div className="topbar">
      <Link href="/dashboard/broker/conversation/RootChat/chats">
        <div
          className={`${
            pathname === "/dashboard/broker/conversation/RootChat/chats"
              ? "text-bold text-gray-900"
              : ""
          } flex items-center text-bold`}
        >
          <img
            src="/images/chatf/bsms-logo.png"
            alt="BSMS Logo"
            className="logo mr-1"
          />
          BSMS CHAT
        </div>
      </Link>

      <div className="menu">
        <Link
          href="/dashboard/broker/conversation/RootChat/chats"
          className={`${
            pathname === "/dashboard/broker/conversation/RootChat/chats"
              ? "text-red-1"
              : ""
          } text-heading4-bold`}
        >
          Chats
        </Link>
        <Link
          href="/dashboard/broker/conversation/RootChat/users"
          className={`${
            pathname === "/dashboard/broker/conversation/RootChat/users"
              ? "text-red-1"
              : ""
          } text-heading4-bold`}
        >
          Users
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
