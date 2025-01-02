"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import { getLocation } from "@/app/_lib/actions_locations";

import "mapbox-gl/dist/mapbox-gl.css";
import LocationGoogleMap from "@/app/_components/LocationGoogleMap";
import { getLocationMap, getTowSpot } from "@/app/_lib/actions_tow";
import TowDashboard from "@/app/_components/TowDashboard";

const Page = (params) => {
  const { id } = useParams();
  const [locationData, setLocationData] = useState(null);
  const [mapSpot, setMapSpot] = useState(null)
  const [mapSpotInfo, setMapSpotInfo] = useState(null)
  const [towSpotId, setTowSpotId] = useState(null)
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchtowMapData = async () => {
      if (!id) return;
      try {
        const mapSpotData  = await getTowSpot(id);
        setMapSpot(mapSpotData.spot);
        setMapSpotInfo(mapSpotData)
      } catch (error) {
        console.error("Error fetching Spot name:", error);
      } finally {
        setLoading(false);
      }
    };

    if (mapSpot === null) {
      fetchtowMapData();
    }
  }, [id, mapSpot, mapSpotInfo]);

  console.log(mapSpotInfo)
  
  useEffect(() => {
    const fetchtowSpotId = async () => {
      if (!mapSpot) return;
      try {
        const towSpotIdData = await getLocationMap(mapSpot);
        setTowSpotId(towSpotIdData.id);
      } catch (error) {
        console.error("Error fetching Spot ID:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (towSpotId === null) {
      fetchtowSpotId();
    }
  }, [mapSpot, towSpotId]);
  
 
  useEffect(() => {
    const fetchlocationData = async () => {
      if (!towSpotId) return;
      try {
        const locationData = await getLocation(towSpotId);
        setLocationData(locationData);
      } catch (error) {
        console.error("Error fetching equipment technical Data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (locationData === null) {
      fetchlocationData();
    }
  }, [towSpotId, locationData]);

  if (!locationData && !loading) {
    return (
      // <h1 className="mt-10 text-2xl font-bold text-center">
      //   Equipment Data Not Found
      // </h1>
      <Spinner/>
    );
  }

    
  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && locationData && (
        <>
          <Suspense fallback={<Spinner />}>
            <Link
              href="/tow"
              className="flex text-2xl font-semibold items-centermb-4 text-primary-300"
            >
              {" "}
              <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
                <ArrowLongLeftIcon className="w-6 h-6 mr-2" /> Back to Sessions
              </span>
            </Link>
            <div className="flex flex-row items-center justify-between w-full px-8 pt-6 pb-4 border-b-4 border-primary-700 ">
            <h1 className="text-4xl font-semibold text-primary-500">
              {mapSpotInfo.sport} -  {mapSpotInfo.spot} - {mapSpotInfo.discipline} on  {format(mapSpotInfo.date, 'dd-MM-yyyy')}
            </h1>
            <div className="flex flex-col text-xl text-primary-500">
              <p>Start {mapSpotInfo.s_time}</p>
              <p>End: {mapSpotInfo.e_time}</p>
              <p>Duration:  {mapSpotInfo.duration}</p>
            </div>
          </div>

            <LocationGoogleMap
              latitude={locationData[0].latitude}
              longitude={locationData[0].longitude}
            />
          <TowDashboard sessionData = {mapSpotInfo}/>
          <div className="w-full px-5 py-3 text-xl font-semi-bold rounded-sm shadow-sm bg-primary-200 text-primary-800 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400">

<h1>{mapSpotInfo.comments}</h1>
</div>
           </Suspense>
        </>
      )}
    </>
  );
};
export default Page;
