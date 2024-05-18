"use client";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "@/app/globals.css";
import ChatDetails from "@/components/ChatComp/ChatDetails";
import Chats from "@/components/ChatComp/Chats";
import TopBar from "@/components/ChatComp/TopBar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BottomBar from "@/components/ChatComp/BottomBar";

const ChatsPage = () => {
  const { chatId } = useParams();

  const [currentUser, setCurrentUser] = useState();

  const seenMessages = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Chat/getChatDetails/${chatId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentUserId: currentUser._id,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (currentUser && chatId) seenMessages();
  }, [currentUser, chatId]);

  return (
    <div className={`${inter.className} bg-blue-2`}>
      <TopBar />
      <div className="main-container">
        <div className="w-1/3 max-lg:hidden">
          <Chats currentChatId={chatId} />
        </div>
        <div className="w-2/3 max-lg:w-full">
          <ChatDetails chatId={chatId} />
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default ChatsPage;
