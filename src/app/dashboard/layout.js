import { Inter } from "next/font/google";
import Sidebar from "@/components/DashboardCom/Sidebar";
import Header from "@/components/DashboardCom/Header";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BSMS",
  description:
    "Final Project For BSc Developed By WKU Software Engineering Student(GZMN)",
};

export default function RootLayout({ children }) {
  return (
    <div className="grid grid-cols-custom h-screen grid-rows-custom">
      <div className="">
        <Header />
      </div>
      <div className="row-custom">
        <Sidebar />
      </div>
      <main className=" pt-7">{children}</main>
    </div>
  );
}
