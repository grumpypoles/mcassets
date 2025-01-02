"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import { getLocation } from "@/app/_lib/actions_locations";

import "mapbox-gl/dist/mapbox-gl.css";
import LocationGoogleMap from "@/app/_components/LocationGoogleMap";

const Page = (params) => {
  const { id } = useParams();
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchlocationData = async () => {
      if (!id) return;
      try {
        const locationData = await getLocation(id);
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
  }, [id, locationData]);

  if (!locationData && !loading) {
    return (
      <h1 className="mt-10 text-2xl font-bold text-center">
        Equipment Data Not Found
      </h1>
    );
  }

  console.log(locationData);
  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && locationData && (
        <>
          <Suspense fallback={<Spinner />}>
            <Link
              href="/locations"
              className="flex text-2xl font-semibold items-centermb-4 text-primary-300"
            >
              {" "}
              <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
                <ArrowLongLeftIcon className="w-6 h-6 mr-2" /> Back to Locations
              </span>
            </Link>
            <div className="flex flex-row items-center justify-between w-full px-8 pt-6 pb-4 border-b-4 border-primary-700 ">
            <h1 className="text-4xl font-semibold text-primary-500">
             {locationData[0].sport} - {locationData[0].spot}
            </h1>
            <div className="flex flex-col text-xl text-primary-500">
              <p>Latitude: {locationData[0].latitude}</p>
              <p>Longitude: {locationData[0].longitude}</p>
            </div>
          </div>

            <LocationGoogleMap
              latitude={locationData[0].latitude}
              longitude={locationData[0].longitude}
            />
           </Suspense>
        </>
      )}
    </>
  );
};
export default Page;
