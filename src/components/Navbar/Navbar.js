"use client";
// import React, { useEffect, useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
// import Link from "next/link";
// import { Box, Modal, IconButton } from "@mui/material";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// import { pusherClient } from "@/lib/pusher";
// const pages = ["Home", "Listings", "Contact", "About Us"];

// function Navbar() {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [userData, setUserData] = useState({});
//   const router = useRouter();

//   React.useEffect(() => {
//     const storedUserData = JSON.parse(localStorage.getItem("user"));
//     setUserData(storedUserData || {});
//   }, []);

//   if (!userData) {
//     return null;
//   }

//   const handleAddProperty = () => {
//     if (user) {
//       router.push(`/dashboard/seller/post`);
//     } else {
//       router.push("/login");
//     }
//   };
//   const ShadowedIconButton = ({ children, onClick }) => (
//     <IconButton
//       style={{
//         marginRight: "15px",
//         backgroundColor: "white",
//         "&:focus": {
//           outline: "none",
//         },
//         "&:active": {
//           backgroundColor: "white",
//         },
//       }}
//       onClick={onClick}
//     >
//       {children}
//     </IconButton>
//   );

//   useEffect(() => {
//     const storedUserData = JSON.parse(localStorage.getItem("user"));
//     setUserData(storedUserData || {});
//   }, []);

//   //useEffect Route To fetch all notifications from backend conditionally
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         let notificationEndPoints;
//         if (userData.user.Role === "User") {
//           notificationEndPoints = `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Notification/fetchAllNotification/${userData.user.Email}`;
//         }
//         const response = await fetch(notificationEndPoints, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         console.log(data);
//         const unreadNotifications = data.notifications.filter(
//           (notification) => !notification.isRead
//         );
//         setNotifications(unreadNotifications);
//         setUnreadCount(unreadNotifications.length);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchNotifications();
//     pusherClient.subscribe("notifications");
//     pusherClient.bind("new-notification", fetchNotifications);
//     return () => {
//       pusherClient.unsubscribe("notifications");
//       pusherClient.unbind("new-notification", fetchNotifications);
//     };
//   }, [userData.user?.Role]);

//   // Send request to backend to mark read  notifications as read
//   const handleMarkAsReadAndModalClose = async () => {
//     try {
//       await Promise.all(
//         notifications.map(async (notification) => {
//           if (!notification.isRead) {
//             await fetch(
//               `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Notification/markAllSeenNotificationAsRead/${notification._id}`,
//               {
//                 method: "PUT",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//               }
//             );
//           }
//         })
//       );
//       setNotifications([]);
//       setShowNotifications(false);
//       setUnreadCount(0);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//   const handleClickAndViewNotification = () => {
//     setShowNotifications(true);
//     setUnreadCount(0);
//   };

//   const handelClose = () => {
//     setShowNotifications(false);
//     setUnreadCount(0);
//   };

//   const userRole = userData.user ? userData.user.Role : "";

//   const appBarStyle = {
//     backgroundColor: "white",
//     boxShadow: "0px 2px 4px rgba(000, 000, 000, 0.1)",
//     width: "100%",
//   };

//   const btnStyle = {
//     color: "black",
//     border: "2px solid rgb(0, 167, 111)",
//     marginRight: "6px",
//     textTransform: "capitalize",
//     fontWeight: "bold",
//   };

//   const signUpBtnStyle = {
//     color: "black",
//     border: "2px solid rgb(0, 167, 111)",
//     textTransform: "capitalize",
//     fontWeight: "bold",
//     backgroundColor: "rgb(0, 167, 111)",
//   };
//   const addBtnStyle = {
//     color: "black",
//     textTransform: "capitalize",
//     fontWeight: "bold",
//     backgroundColor: "rgb(0, 167, 111)",
//     ":hover": {
//       backgroundColor: "rgba(0, 167, 111, 0.1)", // Adjust the opacity or any other properties for the hover effect
//       cursor: "pointer",
//     },
//     marginLeft: "10px",
//   };

//   const listStyle = {
//     textTransform: "capitalize",
//   };

//   return (
//     <AppBar position="fixed" style={appBarStyle} className="container">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "hsl(228, 39%, 23%)",
//               textDecoration: "none",
//             }}
//             className="hover:text-veryDarkBlue"
//           >
//             BSMS
//           </Typography>
//           <Box
//             sx={{
//               flexGrow: 1,
//               display: { xs: "none", md: "flex" },
//               marginLeft: { lg: "200px", md: "150px" },
//             }}
//           >
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 sx={{
//                   color: "black",
//                   display: "block",
//                   textTransform: "capitalize",
//                   fontWeight: "bold",
//                   fontSize: "15px",
//                   textAlign: "center",
//                   "&:hover": {
//                     color: "white",
//                     backgroundColor: "rgb(0, 167, 111)",
//                   },
//                 }}
//               >
//                 <Link href={`/${page.toLowerCase()}`}>{page}</Link>
//               </Button>
//             ))}
//             <Button
//               variant="contained"
//               style={addBtnStyle}
//               className="bg-green text-center ml-10  hover:text-white"
//               onClick={handleAddProperty}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-6 h-6 ml-1 text-white mr-2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//                 />
//               </svg>
//               <span className="text-white font-bold inline-flex items-center capitalize">
//                 Add Property
//               </span>
//             </Button>
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             {userData.user ? (
//               <div className="flex flex-row mt-4">
//                 <div className="mt-2 flex flex-row">
//                   <Link href="/dashboard/seller">
//                     <Link href="/dashboard/seller">
//                       <span className=" text-green font-bold  mr-4">
//                         Dashboard
//                       </span>
//                     </Link>
//                   </Link>
//                 </div>

//                 <Box display="flex" alignItems="center">
//                   {/* Bage */}
//                   <ShadowedIconButton onClick={handleClickAndViewNotification}>
//                     <div style={{ position: "relative" }}>
//                       <NotificationsOutlinedIcon
//                         className="mb-1"
//                         style={{ fontSize: "35px" }}
//                       />
//                       {unreadCount > 0 && !showNotifications && (
//                         <span
//                           className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs absolute top-3 right-3 transform translate-x-1/2 -translate-y-1/2"
//                           style={{ fontWeight: "bold" }}
//                         >
//                           {unreadCount}
//                         </span>
//                       )}
//                     </div>
//                   </ShadowedIconButton>
//                   <Modal
//                     open={showNotifications}
//                     onClose={handelClose}
//                     aria-labelledby="notification-modal"
//                     aria-describedby="notification-modal-description"
//                   >
//                     <div
//                       className=" h-full p-4 bg-white shadow-lg rounded-md absolute top-1/2 right-3 transform -translate-y-1/2"
//                       style={{
//                         width: "320px",
//                         marginTop: "2rem",
//                         maxHeight: "calc(100vh - 5rem)",
//                         overflowY: "auto",
//                       }}
//                     >
//                       <div className="mb-5 text-blue text-center font-bold text-xl">
//                         New Notifications
//                       </div>
//                       {/* Render notifications */}
//                       {notifications.length > 0 ? (
//                         <>
//                           {notifications.map((notification, index) => (
//                             <div key={index} className="mb-5">
//                               <Typography variant="body1">
//                                 <div className="items-center">
//                                   <div className="font-bold text-black">
//                                     {notification.title}
//                                   </div>
//                                   <div className="bg-green-200 p-2">
//                                     {notification.message}
//                                   </div>
//                                 </div>
//                               </Typography>
//                             </div>
//                           ))}
//                           {/* Mark As Read Button */}
//                           <div className="relative w-1/2 mb-2 top-5 rounded bg-gray-300 left-1/2 transform -translate-x-1/2">
//                             <Button
//                               onClick={handleMarkAsReadAndModalClose}
//                               style={{
//                                 color: "black",
//                                 fontWeight: "bold",
//                                 textTransform: "capitalize",
//                               }}
//                             >
//                               Mark As Read
//                             </Button>
//                           </div>
//                         </>
//                       ) : (
//                         <div
//                           className="text-center font-bold"
//                           style={{ marginTop: "250px", color: "red" }}
//                         >
//                           No new notifications
//                         </div>
//                       )}
//                     </div>
//                   </Modal>
//                   <span className="block">
//                     <span className="block text-sm font-medium text-black">
//                       {`${userData.user ? userData.user.FirstName : ""} ${
//                         userData.user ? userData.user.LastName : ""
//                       }`}
//                     </span>
//                     <span className="block text-xs">{userRole}</span>
//                   </span>
//                   <div className="ml-2">
//                     <div className="rounded-full overflow-hidden h-12 w-12">
//                       <Image
//                         src={userData.user ? userData.user.imageUrls[0] : ""}
//                         alt="Profile Picture"
//                         height={70}
//                         width={70}
//                         className="rounded-full ml-1"
//                       />
//                     </div>
//                   </div>
//                 </Box>
//               </div>
//             ) : (
//               <>
//                 <Button variant="outlined" style={btnStyle}>
//                   <Link href="/login">
//                     <span className=" text-black font-bold hover:text-black">
//                       Log In
//                     </span>
//                   </Link>
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   style={signUpBtnStyle}
//                   className=" text-center hover:text-white"
//                 >
//                   <Link href="/register">
//                     <span className=" text-black font-bold hover:text-white">
//                       Sign Up
//                     </span>
//                   </Link>
//                 </Button>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default Navbar;

"use client";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Box, Modal, IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { pusherClient } from "@/lib/pusher";

const pages = ["Home", "Listings", "Contact", "About Us"];

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userData, setUserData] = useState({});
  const router = useRouter();

  // useEffect to fetch user data from local storage
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData || {});
  }, []);

  const handleAddProperty = () => {
    if (userData.user) {
      router.push(`/dashboard/seller/post`);
    } else {
      router.push("/login");
    }
  };

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

  // useEffect to fetch notifications and setup pusher client
  useEffect(() => {
    if (!userData.user) return;

    const fetchNotifications = async () => {
      try {
        let notificationEndPoints;
        if (userData.user.Role === "User") {
          notificationEndPoints = `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Notification/fetchAllNotification/${userData.user.Email}`;
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
  }, [userData.user?.Role, userData.user?.Email]);

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

  const userRole = userData.user ? userData.user.Role : "";

  const appBarStyle = {
    backgroundColor: "white",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    width: "100%",
  };

  const btnStyle = {
    color: "black",
    border: "2px solid rgb(0, 167, 111)",
    marginRight: "6px",
    textTransform: "capitalize",
    fontWeight: "bold",
  };

  const signUpBtnStyle = {
    color: "black",
    border: "2px solid rgb(0, 167, 111)",
    textTransform: "capitalize",
    fontWeight: "bold",
    backgroundColor: "rgb(0, 167, 111)",
  };

  const addBtnStyle = {
    color: "black",
    textTransform: "capitalize",
    fontWeight: "bold",
    backgroundColor: "rgb(0, 167, 111)",
    ":hover": {
      backgroundColor: "rgba(0, 167, 111, 0.1)", // Adjust the opacity or any other properties for the hover effect
      cursor: "pointer",
    },
    marginLeft: "10px",
  };

  const listStyle = {
    textTransform: "capitalize",
  };

  return (
    <AppBar position="fixed" style={appBarStyle} className="container">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "hsl(228, 39%, 23%)",
              textDecoration: "none",
            }}
            className="hover:text-veryDarkBlue"
          >
            BSMS
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              marginLeft: { lg: "200px", md: "150px" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  color: "black",
                  display: "block",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  fontSize: "15px",
                  textAlign: "center",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "rgb(0, 167, 111)",
                  },
                }}
              >
                <Link href={`/${page.toLowerCase()}`}>{page}</Link>
              </Button>
            ))}
            <Button
              variant="contained"
              style={addBtnStyle}
              className="bg-green text-center ml-10  hover:text-white"
              onClick={handleAddProperty}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 ml-1 text-white mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="text-white font-bold inline-flex items-center capitalize">
                Add Property
              </span>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {userData.user ? (
              <div className="flex flex-row mt-4">
                <div className="mt-2 flex flex-row">
                  <Link href="/dashboard/seller">
                    <Link href="/dashboard/seller">
                      <span className=" text-green font-bold  mr-4">
                        Dashboard
                      </span>
                    </Link>
                  </Link>
                </div>

                <Box display="flex" alignItems="center">
                  {/* Badge */}
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
                </Box>
              </div>
            ) : (
              <>
                <Button variant="outlined" style={btnStyle}>
                  <Link href="/login">
                    <span className=" text-black font-bold hover:text-black">
                      Log In
                    </span>
                  </Link>
                </Button>
                <Button
                  variant="outlined"
                  style={signUpBtnStyle}
                  className=" text-center hover:text-white"
                >
                  <Link href="/register">
                    <span className=" text-black font-bold hover:text-white">
                      Sign Up
                    </span>
                  </Link>
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
