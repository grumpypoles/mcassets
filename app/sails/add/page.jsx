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
          href="/sails"
          className="flex items-centermb-4 text-2xl font-semibold text-primary-300"
        >
          {" "}
          <span className="flex flex-row items-center gap-x-2 w-full text-xl font-medium">
            <ArrowLongLeftIcon className="mr-2 h-6 w-6" /> Back to Sails
          </span>
        </Link>

        <SailsForm equipment={null} edit={null} />
      </Suspense>
    </>
  );
};
export default Page;
