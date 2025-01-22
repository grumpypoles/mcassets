"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLongLeftIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import { getSail } from "@/app/_lib/actions_sails";
import SailDashboard from "@/app/_components/SailDashboard";
import { useTransition } from "react";
import { revalidatePath } from "next/cache";
import delete_item from "@/app/_lib/delete_item";

const Page = () => {
  const { id } = useParams();
  const [equipmentData, setEquipmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchEquipmentData = async () => {
      if (!id) return;
      try {
        const equipmentData = await getSail(id);
        setEquipmentData(equipmentData);
      } catch (error) {
        console.error("Error fetching equipment technical Data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (equipmentData === null) {
      fetchEquipmentData();
    }
  }, [id, equipmentData]);

  if (!equipmentData && !loading) {
    return (
      <h1 className="mt-10 text-2xl font-bold text-center">
        Equipment Data Not Found
      </h1>
    );
  }

  function handleDelete() {
    if (confirm("Are you sure you want to delete this record?")) {
      startTransition(async () => {
        try {
          await delete_item(equipmentData, "ws_sails");
          // Optionally show success message or redirect user after deletion
          revalidatePath("/sails");
        } catch (error) {
          console.error("Error deleting item:", error);
          // Show error feedback to the user
        }
      });
    }
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && equipmentData && (
        <Suspense fallback={<Spinner />}>
          <div className="flex flex-row justify-between mb-2">
            <Link
              href="/sails"
              className="flex items-center mb-4 text-2xl font-semibold text-primary-300"
            >
              {" "}
              <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
                <ArrowLongLeftIcon className="w-6 h-6 mr-2" /> Back to Sails
              </span>
            </Link>
            <>
              <button
                title="Delete Item"
                onClick={handleDelete}
                disabled={isPending}
                className="flex items-center mb-4 text-2xl font-semibold text-primary-300"
              >
                <TrashIcon className="w-5 h-5 mt-2 transition-colors text-primary-600 group-hover:text-primary-100" />
              </button>
            </>
          </div>
          <SailDashboard equipmentData={equipmentData} />
        </Suspense>
      )}
    </>
  );
};
export default Page;
