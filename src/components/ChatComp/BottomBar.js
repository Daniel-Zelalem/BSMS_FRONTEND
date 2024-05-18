"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomBar = () => {
  const pathname = usePathname();
  return (
    <div className="bottom-bar">
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
  );
};

export default BottomBar;
