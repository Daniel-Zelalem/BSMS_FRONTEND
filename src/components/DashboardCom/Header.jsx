"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  InputBase,
  IconButton,
  Modal,
  Typography,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import { useSelector } from "react-redux";
import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { pusherClient } from "@/lib/pusher";

const ShadowedIconButton = ({ children, onClick }) => (
  <IconButton
    style={{
      marginRight: "15px",
      backgroundColor: "white",
      "&:focus": {
        outline: "none",
      },
      "&:active": {
        backgroundColor: "white",
      },
    }}
    onClick={onClick}
  >
    {children}
  </IconButton>
);

const Header = () => {
  const user = useSelector((state) => state.auth.value);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userData, setUserData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData || {});
  }, []);

  //useEffect Route To fetch all notifications from backend conditionally
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        let notificationEndPoints;

        if (userData.user.Role === "Broker") {
          notificationEndPoints = `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Notification/fetchAllNotification/${userData.user.Email}`;
        } else if (userData.user.Role === "User") {
          notificationEndPoints = `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Notification/fetchAllNotification/${userData.user.Email}`;
        } else if (userData.user.Role === "BrokerAdmin") {
          notificationEndPoints = `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Notification/fetchAllNotification/${userData.user.Role}`;
        } else {
          throw new Error("Invalid user role");
        }

        const response = await fetch(notificationEndPoints, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        const unreadNotifications = data.notifications.filter(
          (notification) => !notification.isRead
        );
        setNotifications(unreadNotifications);
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchNotifications();
    pusherClient.subscribe("notifications");
    pusherClient.bind("new-notification", fetchNotifications);
    return () => {
      pusherClient.unsubscribe("notifications");
      pusherClient.unbind("new-notification", fetchNotifications);
    };
  }, [userData.user?.Role]);

  // Send request to backend to mark read  notifications as read
  const handleMarkAsReadAndModalClose = async () => {
    try {
      await Promise.all(
        notifications.map(async (notification) => {
          if (!notification.isRead) {
            await fetch(
              `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Notification/markAllSeenNotificationAsRead/${notification._id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
          }
        })
      );
      setNotifications([]);
      setShowNotifications(false);
      setUnreadCount(0);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickAndViewNotification = () => {
    setShowNotifications(true);
    setUnreadCount(0);
  };

  const handelClose = () => {
    setShowNotifications(false);
    setUnreadCount(0);
  };

  const handleLogout = async () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const userRole = userData.user ? userData.user.Role : "";

  return (
    <div className="flex flex-row justify-between px-12 pt-6">
      <div className="flex items-center">
        {/* SEARCH BAR */}
        <Box
          display="flex"
          backgroundColor="white"
          borderRadius="6px"
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        >
          <InputBase sx={{ ml: 2 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
        {userRole === "User" && (
          <Link href="/home">
            <p className="text-green font-semibold ml-2">Home</p>
          </Link>
        )}
      </div>

      <Box display="flex" alignItems="center">
        {/* Bage */}
        <ShadowedIconButton onClick={handleClickAndViewNotification}>
          <div style={{ position: "relative" }}>
            <NotificationsOutlinedIcon
              className="mb-1"
              style={{ fontSize: "35px" }}
            />
            {unreadCount > 0 && !showNotifications && (
              <span
                className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs absolute top-3 right-3 transform translate-x-1/2 -translate-y-1/2"
                style={{ fontWeight: "bold" }}
              >
                {unreadCount}
              </span>
            )}
          </div>
        </ShadowedIconButton>
        {/* Notification Modal */}
        <Modal
          open={showNotifications}
          onClose={handelClose}
          aria-labelledby="notification-modal"
          aria-describedby="notification-modal-description"
        >
          <div
            className=" h-full p-4 bg-white shadow-lg rounded-md absolute top-1/2 right-3 transform -translate-y-1/2"
            style={{
              width: "320px",
              marginTop: "2rem",
              maxHeight: "calc(100vh - 5rem)",
              overflowY: "auto",
            }}
          >
            <div className="mb-5 text-blue text-center font-bold text-xl">
              New Notifications
            </div>
            {/* Render notifications */}
            {notifications.length > 0 ? (
              <>
                {notifications.map((notification, index) => (
                  <div key={index} className="mb-5">
                    <Typography variant="body1">
                      <div className="items-center">
                        <div className="font-bold text-black">
                          {notification.title}
                        </div>
                        <div className="bg-green-200 p-2">
                          {notification.message}
                        </div>
                      </div>
                    </Typography>
                  </div>
                ))}
                {/* Mark As Read Button */}
                <div className="relative w-1/2 mb-2 top-5 rounded bg-gray-300 left-1/2 transform -translate-x-1/2">
                  <Button
                    onClick={handleMarkAsReadAndModalClose}
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    Mark As Read
                  </Button>
                </div>
              </>
            ) : (
              <div
                className="text-center font-bold"
                style={{ marginTop: "250px", color: "red" }}
              >
                No new notifications
              </div>
            )}
          </div>
        </Modal>
        <span className="block">
          <span className="block text-sm font-medium text-black">
            {`${userData.user ? userData.user.FirstName : ""} ${
              userData.user ? userData.user.LastName : ""
            }`}
          </span>
          <span className="block text-xs">{userRole}</span>
        </span>
        <div className="ml-2">
          <div className="rounded-full overflow-hidden h-12 w-12">
            <img
              src={userData.user ? userData.user.imageUrls[0] : ""}
              alt="Profile Picture"
              height={70}
              width={70}
              className="rounded-full ml-1"
            />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-2 focus:outline-none">
              <RiArrowDropDownLine size={30} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link href="/dashboard/seller/profile">
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Box>
    </div>
  );
};

export default Header;
