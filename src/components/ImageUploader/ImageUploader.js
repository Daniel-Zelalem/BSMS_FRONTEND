"use client";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { loadProfile } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import Image from "next/image";

const ImageUpload = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file); // Get URL of the selected file

    setImage(imageUrl); // Set the image URL in component state
    dispatch(loadProfile(imageUrl)); // Dispatch the image URL to Redux store
  };

  return (
    <>
      <div className=" mx-auto ">
        <h1 className="text-2xl font-semibold mx-auto mb-1">Sign Up </h1>
        <label htmlFor="upload-input" className="relative mx-auto">
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="sr-only"
          />
          <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer">
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-full rounded-full"
              />
            ) : (
              <FaCamera className="text-gray-500 w-12 h-12" />
            )}
          </div>
        </label>
      </div>
      <span className="mx-auto mb-2"> Upload Profile Image</span>
    </>
  );
};

export default ImageUpload;
