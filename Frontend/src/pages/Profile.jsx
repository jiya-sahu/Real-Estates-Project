import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileref = useRef(null);
  const [file, setFile] = useState(undefined);
  const [downloadURL, setDownloadURL] = useState("");
  const [formdata, setFormData] = useState({});
  console.log(file);

useEffect(() => {
  if (file) {
    handleUploadFile(file);
  }
}, [file]);

const handleUploadFile = async (file) => {
  if (!file) {
    console.error("No file selected!");
    return;
  }

  try {
    // Convert the file to a Base64 string
    const base64File = await fileToBase64(file);


    // Request body
    const payload = {
      file: base64File,
    };

    // Make a POST request to Cloudinary
    const response = await fetch('/api/auth/uploadFile', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to upload file to Cloudinary");
    }

    const data = await response.json();

    // Extract the file URL
    const fileDownloadURL = data.secure_url;
    console.log("File available at:", fileDownloadURL);
    setDownloadURL(fileDownloadURL);

    // Update formdata with the URL
    setFormData({ ...formdata, avatar: fileDownloadURL });

  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

// Helper function to convert a file to Base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file); // Read file as Data URL
  });
};




  return currentUser ? (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl my-7 text-center font-semibold">Profile</h1>
      <form className="flex flex-col ">
        <input type="file" 
         onChange={(e)=>setFile(e.target.files[0])}
         ref={fileref}
         hidden accept="image/*" />
        <img
          className="rounded-full h-10 w-10 object-cover mx-auto cursor-pointer"
          onClick={() => fileref.current.click()}
          src={currentUser.avatar}
          alt="profile img"
        />
        <input
          type="text"
          id="username"
          className="border my-2 p-3 rounded-lg focus:outline-none"
          placeholder="username"
        />
        <input
          type="email"
          id="email"
          className="border my-2 p-3 rounded-lg focus:outline-none"
          placeholder="email"
        />
        <input
          type="password"
          id="password"
          className="border my-2 p-3 rounded-lg focus:outline-none"
          placeholder="password"
        />
        <button
          type="button"
          className="bg-slate-700 text-white uppercase rounded-lg p-3 my-2 hover:opacity-95 disabled:opacity-80 "
        >
          Update
        </button>
        <button
          type="button"
          className="bg-green-700 text-white uppercase rounded-lg p-3 my-2 hover:opacity-95 disabled:opacity-80"
        >
          Create Listing
        </button>
      </form>
      <div className="flex justify-between">
        <span className="text-red-800">Delete Account</span>
        <span className="text-red-800">Sign out</span>
      </div>
    </div>
  ) : (
    <h2>Sign in to view this page</h2>
  );
}

export default Profile;
