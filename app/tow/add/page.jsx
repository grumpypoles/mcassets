"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import TowForm from "@/app/_components/TowForm";
import {
  getDisciplinesList,
  getWindStrength,
  getWindDirections,
  getSailsSummary,
  getSpots,
  getSwellSize,
  getBoardsSummary,
  getRatings,
} from "@/app/_lib/actions_tow";

const Page = () => {
  
  const [data, setData] = useState({
    data1: null,
    data2: null,
    data3: null,
    data4: null,
    data5: null,
    data6: null,
    data7: null,
    data8: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Run all requests in paraller
        const [data1, data2, data3, data4, data5, data6, data7, data8] =
          await Promise.all([
            getSpots(),
            getDisciplinesList(),
            getWindStrength(),
            getWindDirections(),
            getSwellSize(),
            getSailsSummary(),
            getBoardsSummary(),
            getRatings(),
          ]);

        //SetData
        setData({
          data1,
          data2,
          data3,
          data4,
          data5,
          data6,
          data7,
          data8,
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Empty dependency array so the effect runs once

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error loading data. Please try again later.</p>;
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && data && (
      <>
        <Suspense fallback={<Spinner />}>
          <Link
            href="/tow"
            className="flex items-centermb-4 text-2xl font-semibold text-primary-300"
          >
            {" "}
            <span className="flex flex-row items-center gap-x-2 w-full text-xl font-medium">
              <ArrowLongLeftIcon className="mr-2 h-6 w-6" /> Back to Session
            </span>
          </Link>

          {/* <TowForm equipment={null} edit={null} locations={locations} disciplines={disciplines}/> */}
          <TowForm 
          edit={null} {...data} />
        </Suspense>
      </>
      )}
    </>
  );
};
export default Page;
