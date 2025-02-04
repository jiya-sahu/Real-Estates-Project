import React, { useEffect, useRef, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import {useSelector} from 'react-redux';
import { useNavigate ,useParams } from "react-router-dom";

function Createlisting() {
  const {currentUser} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name:'',
    description:'',
    address:'',
    type:'rent',
    bedrooms:1,
    bathrooms:1,
    regularPrice:0,
    discountPrice:0,
    offer: false,
    parking:false,
    furnished:false,
  });


  const params = useParams();
  const [imageUploadError, setImageUploadError] = useState("");
  const [uploading , setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);



  useEffect(()=>{
    const fetchListings = async () => {
      const listingid = params.listingId;
      const res = await fetch(`/api/listing/get/${listingid}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return ;
      }
      setFormData(data);
    }
    fetchListings();
  },[])




  // Initialize Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dbfjbwpne", 
    },
  });

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
      try {
        setUploading(true);
       
        const urls = await Promise.all(Array.from(files).map(storeImage));
        setFormData({
          ...formData,
          imageUrls: [...formData.imageUrls, ...urls],
        });
        setImageUploadError("");
        setUploading(false);
      } catch (error) {
        setUploading(false);
        setImageUploadError("Image Upload error. Please try again.");
        console.error(error);
      }
    } else {
      setImageUploadError("You can only upload up to 6 images per listing.");
    }
  };

  const storeImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my-cloudinary-preset"); 

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dbfjbwpne/image/upload`,
        formData
      );
      return response.data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image:", error);
      setImageUploadError(error);
      throw error;
    }
  };

  const handleRemoveImage = (index)=>{
    setFormData({
      ...formData,
      imageUrls:formData.imageUrls.filter((_, i)=>i !==index)
    })
  }

  const handleChange = (e)=>{
    if(e.target.id === 'sale' || e.target.id === 'rent'){
      setFormData({ 
      ...formData,
      type:e.target.id
      })
    }

    if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
      setFormData({ 
        ...formData,
       [e.target.id] : e.target.checked
        })
    }

    if (e.target.type === 'number' || e.target.type === 'text' ||e.target.type === 'textarea'){
      setFormData({
        ...formData,
      [e.target.id]:e.target.value
      })
      
    }


    if (!currentUser?._id) {
      return setError("User reference (userRef) is missing");
    }
    
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      if (formData.imageUrls.length <1)return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('discount price ,ust be lesser than regular price');
     setLoading(true);
      const res = await fetch(`/api/listing/update/${params.listingId}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
      ...formData,
      userRef : currentUser._id

        })})
      
      const data = await res.json();
     setLoading(false);
     if (data.success == false){
      setError(data.message);
     }

     navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error);
     
    }
  }
 

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update Listing
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className="flex flex-col gap-4 flex-1">
          {/* Input Fields */}
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            value={formData.address}
            onChange={handleChange}
          />

      <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          {/* Numeric Inputs */}
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>($ / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>

                  {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-700 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              onChange={(e) => setFiles(e.target.files)}
              id="images"
              accept="image/*"
              multiple
            />
            <button
              onClick={handleUpload}
              type="button"
              className="uppercase text-green-700 border p-3 border-green-700 rounded hover:shadow-lg"
            >
             {uploading?'Uploading':'Upload'}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {/* Display Uploaded Images */}
          {formData.imageUrls.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="p-3">
                  <img
                    src={url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-40 h-40 object-cover rounded-lg"
                  />
                   <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
                </div>
              ))}
            </div>
          )}
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80">
            {loading?'Updating...':' Update Listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}

export default Createlisting;
