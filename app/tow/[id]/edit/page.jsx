"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import LocationForm from "@/app/_components/LocationForm";
import { getSpecificSession } from "@/app/_lib/actions_tow";
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

const Page = (params) => {
  const { id } = useParams();
  const [equipmentData, setEquipmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    data1: null,
    data2: null,
    data3: null,
    data4: null,
    data5: null,
    data6: null,
    data7: null,
    data8: null,
    data9: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Run all requests in paraller
        const [data1, data2, data3, data4, data5, data6, data7, data8, data9] =
          await Promise.all([
            getSpots(),
            getDisciplinesList(),
            getWindStrength(),
            getWindDirections(),
            getSwellSize(),
            getSailsSummary(),
            getBoardsSummary(),
            getRatings(),
            getSpecificSession(id),
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
          data9,
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



  // useEffect(() => {
  //   const fetchEquipmentData = async () => {
  //     if (!id) return;
  //     try {
  //       const equipmentData = await getSpecificSession(id);
  //       setEquipmentData(equipmentData);
  //     } catch (error) {
  //       console.error("Error fetching equipment technical Data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (equipmentData === null) {
  //     fetchEquipmentData();
  //   }
  // }, [id, equipmentData]);

  // if (!equipmentData && !loading) {
  //   return (
  //     <h1 className="mt-10 text-2xl font-bold text-center">
  //       Location Data Not Found
  //     </h1>
  //   );
  // }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error loading data. Please try again later.</p>;
  }

  // const eqData = {equipmentData}


  return (

    
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && data && (
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

            <TowForm edit={'edit'} {...data}/>
          </Suspense>
          
        </>
      )}
    </>
  );
};
export default Page;
