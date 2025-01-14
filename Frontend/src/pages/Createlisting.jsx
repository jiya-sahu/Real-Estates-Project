import React from "react";

function Createlisting() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create Listing</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="description"
            className="border p-3 rounded-lg "
            id="description"
            required
          />
          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg "
            id="address"
            required
          />
        
        <div className="flex gap-6 flex-wrap">
          <div className="flex gap-2">
            <input type="checkbox" name="sale" id="sale" className="w-5" />
            <span>Sale</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" name="Rent" id="Rent" className="w-5" />
            <span>Rent</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="Parking-spot"
              id="Parking-spot"
              className="w-5"
            />
            <span>Parking spot</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="Furnished"
              id="Furnished"
              className="w-5"
            />
            <span>Furnished</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" name="Offer" id="Offer" className="w-5" />
            <span>Offer</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="bedrooms"
              min="1"
              max="10"
              required
              className="p-3 border border-gray-300 rounded-lg"
            />
            <p>Beds</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="bathrooms"
              min="1"
              max="10"
              required
              className="p-3 border border-gray-300 rounded-lg"
            />
            <p>Baths</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="regular-price"
              min='50'
              max='1000000000'
              required
              className="p-3 border border-gray-300 rounded-lg"
            />
            <div className="flex flex-col items-center">
              <p>Regular price</p>
              <span className="text-xs">($ / month)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="discount-price"
               min='0'
              max='1000000000'
              required
              className="p-3 border border-gray-300 rounded-lg"
            />
            <div className="flex flex-col items-center">
              <p>Discount price</p>
              <span className="text-xs">($ / month)</span>
            </div>
          </div>
        </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">Images:
            <span className="font-normal text-gray-700 ml-2">The first image will be the cover (max 6)</span>
            </p>
            <div className="flex gap-4">
                <input className="p-3 border border-gray-300 rounded w-full"
                type="file"  id="images" accept="image/*" multiple />
                <button className="uppercase text-green-700 border p-3 border-green-700 rounded hover:shadow-lg disabled:opacity-80">Upload</button>
            </div>
            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80">create listing</button>
        </div>
      
      </form>
    </main>
  );
}

export default Createlisting;
