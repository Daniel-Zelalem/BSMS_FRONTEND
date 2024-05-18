"use client";
import React, { useEffect, useRef, useState } from "react";
import { AddPhotoAlternate } from "@mui/icons-material";
import { CldUploadButton } from "next-cloudinary";
import Link from "next/link";
import MessageBox from "./MessageBox";
import Loader from "./Loader";
import { pusherClient } from "@/lib/pusher";
import Image from "next/image";

const ChatDetails = ({ chatId }) => {
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState({});
  const [otherMembers, setOtherMembers] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const [text, setText] = useState("");

  const getChatDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Chat/getChatDetails/${chatId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setChat(data);
      setOtherMembers(
        data?.members?.filter((member) => member._id !== currentUser._id)
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (currentUser && chatId) getChatDetails();
  }, [currentUser, chatId]);

  const sendText = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Message/PostMessages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId,
            currentUserId: currentUser._id,
            text,
          }),
        }
      );

      if (res.ok) {
        setText("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendPhoto = async (result) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Message/PostMessages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId,
            currentUserId: currentUser._id,
            photo: result?.info?.secure_url,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    pusherClient.subscribe(chatId);

    const handleMessage = async (newMessage) => {
      setChat((prevChat) => {
        return {
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        };
      });
    };

    pusherClient.bind("new-message", handleMessage);

    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("new-message", handleMessage);
    };
  }, [chatId]);

  /* Scrolling down to the bottom when having the new message */
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat?.messages]);

  /*enter key*/
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const PressInterKey = (event) => {
    if (event.key === "Enter" && text.trim() !== "") {
      sendText();
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="pb-20">
      <div className="chat-details">
        <div className="chat-header">
          {chat?.isGroup ? (
            <>
              <Link
                href={`/dashboard/broker/conversation/RootChat/chats/${chatId}/group`}
              >
                <img
                  src={chat?.groupPhoto || "/images/chatf/group.png"}
                  alt="group-photo"
                  className="profilePhoto"
                />
              </Link>

              <div className="text">
                <p>
                  {chat?.name} &#160; &#183; &#160; {chat?.members?.length}{" "}
                  members
                </p>
              </div>
            </>
          ) : (
            <>
              <img
                src={otherMembers[0]?.imageUrls || "/images/chatf/person.png"}
                alt="Image"
                className="profilePhoto"
              />
              <div className="text">
                {otherMembers[0]?.FirstName} {otherMembers[0]?.LastName}
              </div>
            </>
          )}
        </div>
        <div className="chat-body">
          {chat?.messages?.map((message, index) => (
            <MessageBox
              key={index}
              message={message}
              currentUser={currentUser}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="send-message">
          <div className="prepare-message">
            <CldUploadButton
              options={{ maxFiles: 5 }}
              onUpload={sendPhoto}
              uploadPreset="iptanjx7"
            >
              <AddPhotoAlternate
                sx={{
                  fontSize: "35px",
                  color: "#737373",
                  cursor: "pointer",
                  "&:hover": { color: "red" },
                }}
              />
            </CldUploadButton>
            <input
              type="text"
              placeholder="Write you message her..."
              className="input-field-msg"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={PressInterKey}
              required
            />
          </div>

          <div onClick={sendText}>
            <img
              src="/images/chatf/send.png"
              alt="send"
              className="send-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatDetails;
