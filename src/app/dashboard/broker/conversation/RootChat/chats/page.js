"use client";
import { Inter } from "next/font/google";
import ChatHome from "./Home";
import "@/app/globals.css";
import TopBar from "@/components/ChatComp/TopBar";
import BottomBar from "@/components/ChatComp/BottomBar";

const inter = Inter({ subsets: ["latin"] });

const MainHome = () => {
  return (
    <div className={`${inter.className} bg-blue-2`}>
      <TopBar />
      <ChatHome />
      <BottomBar />
    </div>
  );
};

export default MainHome;
