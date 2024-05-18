"use client";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      getAllUsers(currentUser.Role);
    }
  }, [currentUser, search]);

  const getAllUsers = async (userRole) => {
    try {
      const res = await fetch(
        search !== ""
          ? `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/searchUsers?query=${search}`
          : `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/allChatUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            userrole: userRole,
          },
        }
      );
      const data = await res.json();

      const filteredUsers = Array.isArray(data)
        ? data.filter((user) => user._id !== (currentUser && currentUser._id))
        : [];

      setUsers(filteredUsers);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //select Users to start chat
  const [selectedUsers, setSelectedUsers] = useState([]);
  const isGroup = selectedUsers.length > 1;

  const handleSelect = (user) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(user)) {
        return prevSelectedUsers.filter((item) => item !== user);
      } else {
        return [...prevSelectedUsers, user];
      }
    });
  };

  /* ADD GROUP CHAT NAME */
  const [name, setName] = useState("");

  const router = useRouter();

  /* CREATE CHAT */
  const createChat = async () => {
    const usersWithId = selectedUsers.filter((user) => user._id);

    if (usersWithId.length === 0) {
      console.error("No users with _id property found.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Chat/createNewChat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentUserId: currentUser._id,
            members: usersWithId,
            isGroup,
            name,
          }),
        }
      );

      const chat = await res.json();

      if (res.ok) {
        console.log(chat);
        router.push(
          `/dashboard/broker/conversation/RootChat/chats/${chat._id}`
        );
      } else {
        console.error("Failed to create chat:", chat.message);
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="create-chat-container">
      <input
        placeholder="Search contact here..."
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="contact-bar">
        <div className="contact-list" style={{ height: 605 }}>
          <p className="text-body-bold">Select User</p>
          <div className="flex flex-col flex-1 gap-5 custom-scrollbar">
            {users.map((user, index) => (
              <div
                key={index}
                className="contact"
                onClick={() => handleSelect(user)}
              >
                {selectedUsers.find((item) => item === user) ? (
                  <CheckCircle sx={{ color: "red" }} />
                ) : (
                  <RadioButtonUnchecked />
                )}
                <img
                  src={user?.imageUrls || "/images/chatf/person.png"}
                  alt="Image"
                  className="profilePhoto"
                />
                <div className="flex flex-col ml-1">
                  <p className="text-base-bold">
                    {user.FirstName} {user.LastName}
                  </p>
                  <p className="text-base-bold">{user.Email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="create-chat">
          {isGroup && (
            <>
              <div className="flex flex-col gap-3">
                <p className=" t-body-bold">Group Chat Name</p>
                <input
                  placeholder="Enter group chat name..."
                  className="input-group-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-body-bold">Members</p>
                <div className="flex flex-wrap gap-3">
                  {selectedUsers.map((user, index) => (
                    <p className="selected-contact" key={index}>
                      {user.FirstName} {user.LastName}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
          <button
            className="btn"
            onClick={createChat}
            disabled={selectedUsers.length === 0}
          >
            Lets Continue or Start a new chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
