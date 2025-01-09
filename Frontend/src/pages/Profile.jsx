import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserfailure,
  deleteUserSuccess,
} from "../redux/users/userSlice";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileref = useRef(null);
  const [file, setFile] = useState(undefined);
  const [downloadURL, setDownloadURL] = useState("");
  const [updatesuccess, setUpdatesuccess] = useState(false);
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const dispatch = useDispatch();
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
      const response = await fetch("/api/auth/uploadFile", {
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

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  };

  console.log(formdata);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);

        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdatesuccess(true);
    } catch (error) {
      console.log(error.message);

      dispatch(updateUserFailure(error));
    }
  };

  const handleDelete = async (req, res, next) => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(deleteUserfailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserfailure(error.message));
    }
  };

  return currentUser ? (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl my-7 text-center font-semibold">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col ">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileref}
          hidden
          accept="image/*"
        />
        <img
          className="rounded-full h-10 w-10 object-cover mx-auto cursor-pointer"
          onClick={() => fileref.current.click()}
          src={formdata.avatar || currentUser.avatar}
          alt="profile img"
        />
        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border my-2 p-3 rounded-lg focus:outline-none"
          placeholder="username"
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border my-2 p-3 rounded-lg focus:outline-none"
          placeholder="email"
        />
        <input
          type="password"
          id="password"
          onChange={handleChange}
          className="border my-2 p-3 rounded-lg focus:outline-none"
          placeholder="password"
        />
        <button className="bg-slate-700 text-white uppercase rounded-lg p-3 my-2 hover:opacity-95 disabled:opacity-80 ">
         {loading?"loading...":"update"}
        </button>
        <button className="bg-green-700 text-white uppercase rounded-lg p-3 my-2 hover:opacity-95 disabled:opacity-80">
          Create Listing
        </button>
      </form>
      <div className="flex justify-between">
        <span className="text-red-800 cursor-pointer" onClick={handleDelete}>
          Delete Account
        </span>
        <span className="text-red-800 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700 mt-2">{error ? error.message : ""}</p>
      <p className="text-green-700 mt-5">
        {updatesuccess ? "User updated successfully" : ""}
      </p>
    </div>
  ) : (
    <h2>Sign in to view this page</h2>
  );
}

export default Profile;
