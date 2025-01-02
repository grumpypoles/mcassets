import React from "react";
import Image from "next/image";
import Link from "next/link";
import ActionButton from "./ActionButton";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

function SailCard({ equipment }) {
  const urlsString = equipment.image;
  const urls = JSON.parse(urlsString);

  return (
    <div className="flex flex-col gap-6 px-12 py-8 text-lg bg-primary-800">
      <div className="relative w-3/4 h-64 mx-auto overflow-hidden rounded-t-xl">
        {" "}
        {/* Fixed height container */}
        <Image
          src={urls[0]}
          alt=""
          fill // Ensures the image covers the container
          sizes="100vw"
          // className="object-cover" // Maintain aspect ratio, fill the container
        />
      </div>
      <div className="p-4 min-h-32 ">
        <div className="mb-6 text-left md:text-center lg:text-left">
          <div className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400">
            {equipment.selcode} {equipment.year} {equipment.make}{" "}
            {equipment.model} {equipment.size}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-end justify-between mb-2">
        <Link
          href={`/sails/${equipment.id}/edit`}
          className="flex items-center mb-4 text-2xl font-semibold text-primary-300"
        >
          {" "}
          <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
            <ArrowLeftIcon className="w-6 h-6 mr-2" /> Update
          </span>
        </Link>
        <Link
          href={`/sails/${equipment.id}`}
          className="flex items-center mb-4 text-2xl font-semibold text-primary-300"
        >
          <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
            Details
            <ArrowRightIcon className="w-6 h-6 mr-2" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SailCard;
