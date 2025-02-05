import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Swiper , SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import { useSelector } from "react-redux";
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';

function Listing() {
  SwiperCore.use(Navigation);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const listingid = params.listingId;
        const res = await fetch(`/api/listing/get/${listingid}`);
        const data = await res.json();
        if (data.success === false) {
         setError(true);
          setLoading(false);
          return;
        }
        setListings(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListings();
 
    
  },[params.listingId]);

  return (
  <main>
    {loading && <p className="text-center my-7 text-2xl font-semibold">Loading...</p> }
    {error && <p className="text-center my-7 text-2xl font-semibold">Something went wrong</p> }
    {listings && !loading && !error && (
        <div>
            <Swiper navigation>
                {listings.imageUrls.map((url)=>(
                    <SwiperSlide key={url}>
                        <div className="h-[550px]"
                        style={{background:`url(${url}) center no-repeat`,
                        backgroundSize:'cover'}}></div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listings.name} - ${' '}
              {listings.offer
                ? listings.discountPrice.toLocaleString('en-US')
                : listings.regularPrice.toLocaleString('en-US')}
              {listings.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listings.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listings.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listings.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listings.regularPrice - +listings.discountPrice} OFF
                </p>
              )}
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listings.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listings.bedrooms > 1
                  ? `${listings.bedrooms} beds `
                  : `${listings.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listings.bathrooms > 1
                  ? `${listings.bathrooms} baths `
                  : `${listings.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listings.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listings.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
        </div>
     
        </div>)}
    
  </main>); 
}

export default Listing;
