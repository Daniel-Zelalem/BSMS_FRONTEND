"use client";
import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const MyProfile = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData || {});
  }, []);

  if (!userData) {
    return null;
  }
  const user = userData.user ? userData.user : "";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file); // Get URL of the selected file

    setImage(imageUrl); // Set the image URL in component state
    setFile(file); // Set the file object in component state
  };
  return (
    <>
      <section>
        <div className="bg-darkBlue mx-12 rounded flex justify-between ">
          <div>
            <label htmlFor="upload-input" className="relative  p-3 ">
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
              <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer ml-3">
                {image ? (
                  <img
                    src={user.imageUrls[0]}
                    alt="Uploaded"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <FaCamera className="text-gray-500 w-12 h-12" />
                )}
              </div>
            </label>
            <div className="px-3">
              <h4 className="text-white text-1xl font-bold pb-3">
                {`${user.FirstName} ${user.LastName}`}
              </h4>
            </div>
          </div>
          <div></div>
        </div>
        <div className="mx-12 mt-4 shadow border rounded">
          <Tabs defaultValue="General" className="w-full mt-3 ">
            <TabsList className="ml-2">
              <TabsTrigger
                value="General"
                className="text-black text-1xl font-bold "
              >
                General
              </TabsTrigger>
              <TabsTrigger
                value="Login Credentials"
                className="text-black text-1xl font-bold"
              >
                Login Credentials
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Login Credentials">
              <div className="grid  grid-cols-2 w-full gap-3">
                <div className="mb-3 mx-2 mt-2">
                  <Label htmlFor="location" className="font-bold block">
                    Old Email :
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Old Email "
                    className="mt-3"
                  />
                </div>
                <div className="mb-3 mx-2 mt-2">
                  <Label htmlFor="location" className="font-bold block">
                    New Email :
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder=" New Email "
                    className="mt-3"
                  />
                </div>
                <div className="mb-3 mx-2 mt-2">
                  <Label htmlFor="location" className="font-bold block">
                    Old Phone Number :
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="  Old Phone Number"
                    className="mt-3"
                  />
                </div>
                <div className="mb-3 mx-2 mt-2">
                  <Label htmlFor="location" className="font-bold block">
                    New Phone Number :
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="  Old Phone Number"
                    className="mt-3"
                  />
                </div>
              </div>
              <Button className="bg-green mx-2 mb-3  hover:bg-green/90">
                Update Credentials
              </Button>
            </TabsContent>
            <TabsContent value="General">
              <div className="grid  grid-cols-2 w-full gap-3">
                <div className="mb-3 mx-2 mt-2">
                  <Label htmlFor="location" className="font-bold block">
                    First Name :
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="   First Name "
                    className="mt-3"
                  />
                </div>
                <div className="mb-3 mx-2 mt-2">
                  <Label htmlFor="location" className="font-bold block">
                    Last Name :
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="   Last Name"
                    className="mt-3"
                  />
                </div>
                <div className="mb-3 mx-2">
                  <Label htmlFor="location" className="font-bold block">
                    User Name :
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="User Name "
                    className="mt-3"
                  />
                </div>

                <div className="mb-3 mx-2">
                  <Label htmlFor="location" className="font-bold block mb-1">
                    Phone Number :
                  </Label>
                  <div className="flex">
                    <Input
                      disabled
                      type="tel"
                      placeholder="+251"
                      className="w-16 font-bold  placeholder"
                    />
                    <Input
                      type="number"
                      id="Phone"
                      name="Phone"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
              </div>
              <Button className="bg-green mx-2 mb-3  hover:bg-green/90">
                Save Changes
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default MyProfile;
