"use client";

import { useEffect, useState } from "react";
import { setDefaults, fromAddress } from "react-geocode";
import Map, { Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Image from "next/image";
import pin from '@/app/_images/pin.svg'
import Spinner from "@/app/_components/Spinner";


const LocationGoogleMap = ({ latitude, longitude }) => {
 
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    width: "100%",
    height: "500px",
  });

  
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "us",
  });
  const lng = longitude 
  const lat = latitude
  

  return(
    // !loading && (
        <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15,
        }}
        style={{ width: '100%', height: 500 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      >
        <Marker longitude={lng} latitude={lat} anchor='bottom'>
          <Image src={pin} alt='location' width={40} height={40} />
        </Marker>
      </Map>
    // )
  )
};

export default LocationGoogleMap;
