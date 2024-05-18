"use client";
import React, { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import Loader from "./Loader";
import { pusherClient } from "@/lib/pusher";

const Chats = ({ currentChatId }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

  const getAllChats = async () => {
    try {
      const res = await fetch(
        search !== ""
          ? `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/searchChats/${currentUser._id}/?query=${search}`
          : `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/getAllChats/${currentUser._id}`
      );
      const data = await res.json();

      const filteredChats = Array.isArray(data)
        ? data.filter((user) => user._id !== (currentUser && currentUser._id))
        : [];
      setChats(filteredChats);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      getAllChats();
    }
  }, [currentUser, search]);

  useEffect(() => {
    if (currentUser) {
      pusherClient.subscribe(currentUser._id);

      const handleChatUpdate = (updatedChat) => {
        setChats((allChats) =>
          allChats.map((chat) => {
            if (chat._id === updatedChat.id) {
              return { ...chat, messages: updatedChat.messages };
            } else {
              return chat;
            }
          })
        );
      };

      const handleNewChat = (newChat) => {
        setChats((allChats) => [...allChats, newChat]);
      };

      pusherClient.bind("update-chat", handleChatUpdate);
      pusherClient.bind("new-chat", handleNewChat);

      return () => {
        pusherClient.unsubscribe(currentUser._id);
        pusherClient.unbind("update-chat", handleChatUpdate);
        pusherClient.unbind("new-chat", handleNewChat);
      };
    }
  }, [currentUser]);

  return loading ? (
    <Loader />
  ) : (
    <div className="chat-list">
      <input
        placeholder="Search chat here..."
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="chats">
        <p className="text-body-bold py-4 px-6">Select Chat</p>
        {chats?.map((chat, index) => (
          <ChatBox
            key={index}
            chat={chat}
            currentUser={currentUser}
            currentChatId={currentChatId}
          />
        ))}
      </div>
    </div>
  );
};
export default Chats;
