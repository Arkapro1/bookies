'use client'
import React, { useState } from "react";
import { Image } from 'cloudinary-react';
import axios from 'axios';
import { useParams } from "next/navigation";
const CLOUDINARY_CLOUD_NAME="dp9sxoddy"
,CLOUDINARY_API_KEY="744592612514596"
,CLOUDINARY_API_SECRET="tTNiGqsPjnHncSuQ4NI5cY5x_Rc",
CLOUDINARY_UPLOAD_PRESET="npfiapsd"
let uploadedImage=""
const Upload = () => {
    const {id}=useParams()
    const uploadfileApi="/api/uploadfile/"
    const [file, setFile] = useState([]);
    console.log("look",uploadedImage);
    const handleFileChange = async (e) => {
     alert("Uploading Your Files⌛🔐")
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      //file detected
      setFile([...file, selectedFile]); // Use spread operator to update state

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      try {
        console.log('uploading');
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData,
        )
        // //  taking the UpdatedImgId
        uploadedImage=response.data.public_id;
        // // demon try 
        // console.log(response);
        // setUploadedImage(response.data.public_id);
        console.log("this is data uploadedImageId->>",uploadedImage)
      } catch (error) {
        console.error('Error uploading image:', error);                                                                                                                                                                                                                                                                                         
      }
    }
  };
  // console.log(file);
  return (
    <>
          <div className="mt-20">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Upload Your
          </span>{" "}
          Files Here.
        </h1>
        <div className="flex items-center justify-center lg:w-1/3">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <a href="/pages/homepage/userMainPage/">
          <button className="border border-white hover:bg-gray-700 text-gray-200 p-3 rounded-lg mt-5">
            Go Back
          </button>
        </a>
      </div>
      {uploadedImage && (
        <div className="mt-5">
          <h2>Uploaded Image:</h2>
          <Image
            cloudName={process.env.CLOUDINARY_CLOUD_NAME}
            publicId={uploadedImage}
          />
        </div>
      )}
    </>
  );
};
export default Upload;
