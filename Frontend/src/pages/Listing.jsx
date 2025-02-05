import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Swiper , SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import { useSelector } from "react-redux";
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';


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
        </div>
    )}
  </main>); 
}

export default Listing;
