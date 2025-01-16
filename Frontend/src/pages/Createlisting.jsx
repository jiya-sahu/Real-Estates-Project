import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from 'axios'

function Createlisting() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState("");

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
        const urls = await Promise.all(Array.from(files).map(storeImage));
        setFormData({
          ...formData,
          imageUrls: [...formData.imageUrls, ...urls],
        });
        setImageUploadError("");
      } catch (error) {
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
    formData.append("upload_preset", "your-upload-preset"); // Replace with your upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dbfjbwpne/image/upload`,
        formData
      );
      return response.data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
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
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />

          {/* Checkbox Options */}
          <div className="flex gap-6 flex-wrap">
            {["Sale", "Rent", "Parking-spot", "Furnished", "Offer"].map(
              (label) => (
                <div key={label} className="flex gap-2">
                  <input
                    type="checkbox"
                    name={label.toLowerCase()}
                    id={label.toLowerCase()}
                    className="w-5"
                  />
                  <span>{label}</span>
                </div>
              )
            )}
          </div>

          {/* Numeric Inputs */}
          <div className="flex flex-wrap gap-6">
            {[
              { id: "bedrooms", label: "Beds", min: 1, max: 10 },
              { id: "bathrooms", label: "Baths", min: 1, max: 10 },
              { id: "regular-price", label: "Regular price ($/month)", min: 50, max: 1000000000 },
              { id: "discount-price", label: "Discount price ($/month)", min: 0, max: 1000000000 },
            ].map(({ id, label, min, max }) => (
              <div key={id} className="flex items-center gap-2">
                <input
                  type="number"
                  id={id}
                  min={min}
                  max={max}
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <p>{label}</p>
              </div>
            ))}
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
              Upload
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
                  <button className="p-3 tezt-red-700 rounded-lg uppercase hover:opacity-95">Delete</button>
                </div>
              ))}
            </div>
          )}
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default Createlisting;
