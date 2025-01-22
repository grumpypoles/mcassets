"use client";

import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import SailsForm from "@/app/_components/SailsForm";

const Page = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Link
          href="/hiassets"
          className="flex text-2xl font-semibold items-centermb-4 text-primary-300"
        >
          {" "}
          <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
            <ArrowLongLeftIcon className="w-6 h-6 mr-2" /> Back to Assets
          </span>
        </Link>

        <SailsForm equipment={null} edit={null} />
      </Suspense>
    </>
  );
};
export default Page;
