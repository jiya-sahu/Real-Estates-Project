import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserfailure,
  deleteUserSuccess,
  signoutUserStart,
  signoutUserSuccess,
  signoutUserfailure,
} from "../redux/users/userSlice";
import { Link } from "react-router-dom";


function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileref = useRef(null);
  const [file, setFile] = useState(undefined);
  const [downloadURL, setDownloadURL] = useState("");
  const [ShowListingsError , setShowListingsError] = useState('');
  const [updatesuccess, setUpdatesuccess] = useState(false);
  const [userlistings , setuserlistings] = useState([]);
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    avatar:""
   
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
      setFormData({ ...formdata, avatar: downloadURL });
      dispatch(updateUserSuccess({ ...currentUser, avatar: fileDownloadURL }));
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
        method: 'POST',
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

      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
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

  const handleSignout = async ()=>{
    try {
      dispatch(signoutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserfailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserfailure(error.message));
    }
  }

  const handleShowListings = async()=>{
    try {
      const res = await fetch(`/api/user/listing/${currentUser._id}`)
      const data = await res.json();
      if (data.success == false){
        setShowListingsError(data.message);
        return ;
      }
      setuserlistings(data);
      
    } catch (error) {
      setShowListingsError(error);
    }
  }

  const handleDeletelisting= async(listingid)=>{
    try {
      const res = await fetch(`/api/listing/delete/${listingid}`,{
        method:'DELETE',
      })
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);return ;
        
      }
      setuserlistings((prev)=>prev.filter((listing)=>listing._id !== listingid))

    } catch (error) {
     
      
    }
  }

  
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
        <Link className="bg-green-700 text-white text-center uppercase rounded-lg p-3 my-2 hover:opacity-95 " to={'/Createlisting'}>
        Create Listing
        </Link>
      </form>
      <div className="flex justify-between">
        <span className="text-red-800 cursor-pointer" onClick={handleDelete}>
          Delete Account
        </span>
        <span className="text-red-800 cursor-pointer" onClick={handleSignout}>Sign out</span>
      </div>
      <p className="text-red-700 mt-2">{error ? error.message : ""}</p>
      <p className="text-green-700 mt-5">
        {updatesuccess ? "User updated successfully" : ""}
      </p>
      <button  className="text-green-700 w-full"
      onClick={handleShowListings}>
        Show Listings
      </button>
      <p className="text-red-700 mt-2">{ShowListingsError? ShowListingsError :''}</p>
     
      {
      userlistings  && userlistings.length>0 && 
      <div className="">
        <h1 className="text-center mt-7 text-2xl font-semibold">
          Your Listings 
        </h1>
       { userlistings.map((listing)=>(
        <div key={listing._id}className="flex p-3 gap-4 rounded-lg border justify-between items-center">
       <Link to={`/listing/${listing._id}`}>
       <img src={listing.imageUrls[0]} alt="listing-cover" className="h-16 w-16 object-contain rounded-lg"/>
       </Link>
       <Link to={`/listing/${listing._id}`}className="text-slate-700 font-semibold flex-1 hover:underline truncate">
       <p >{listing.name}</p>
       </Link>

       <div className="flex flex-col items-center">
        <button className="text-red-700 uppercase" onClick={()=>handleDeletelisting(listing._id)}>delete</button>
        <Link to={`/updatelisting/${listing._id}`}>
        <button className="text-green-700 uppercase">edit</button>
        </Link>
        
       </div>
      </div>))}
      </div>
  
     
    }
    </div>
  ) : (
    <h2>Sign in to view this page</h2>
  );
}

export default Profile;
