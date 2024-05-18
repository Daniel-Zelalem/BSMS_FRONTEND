import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "@/app/globals.css";
import TopBar from "@/components/ChatComp/TopBar";
import Users from "@/components/ChatComp/Users";
import BottomBar from "@/components/ChatComp/BottomBar";

const UsersPage = () => {
  return (
    <div className={`${inter.className} bg-blue-2`}>
      <TopBar />
      <div className="px-2 py-2  mb-5">
        <Users />
      </div>
      <BottomBar />
    </div>
  );
};

export default UsersPage;
